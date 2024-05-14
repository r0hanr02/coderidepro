import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from 'react-icons/fa6'
import { FcSettings } from 'react-icons/fc'
import { MdCheck,MdEdit } from 'react-icons/md'
import SplitPane from 'react-split-pane'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript';
import { Link } from 'react-router-dom'
import { LOGO } from '../assets'
import { AnimatePresence,motion} from "framer-motion"
import { Alert, UserProfileDetails } from '../components'
 import { useSelector } from 'react-redux'
 import { doc, setDoc, collection } from 'firebase/firestore'; //
import { db } from '../config/firebase.config'

const NewProject = () => {
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [js, setJs] = useState('');
    const [output, setOutput] = useState('');
    const [Title, setTitle] = useState('Untitled');
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [isTitle, setIsTitle] = useState(false);  
    const user = useSelector(state => state.user?.user);

    useEffect(() => {
        updateOutput();
    }, [html, css, js]);

    const updateOutput = () => {
        const combinedOutput = `
            <html>
                <head>
                    <style>${css}</style>
                </head>
                <body>
                    ${html}
                    <script>${js}</script>
                </body>
            </html>
        `;
        setOutput(combinedOutput);
    };

    const saveProgram = async () => {
        const docRef = doc(collection(db, "Projects"));
        const id = docRef.id;

        await setDoc(docRef, {
            id: id,
            title: Title,
            html: html,
            css: css,
            js: js,
            output: output,
            user: user
        })
        .then(() => {
            setAlert(true);
            setAlertMsg("Project Saved Successfully!");
            setTimeout(() => {
                setAlert(false);
            }, 2000);
        })
        .catch((err) => {
            console.error(err);
            setAlert(true);
            setAlertMsg("Failed to save project: " + err.message);
            setTimeout(() => {
                setAlert(false);
            }, 4000);
        });
    };

    return (
        <div className='w-screen h-screen flex flex-col items-start justify-start overflow-hidden'>
            <AnimatePresence>
                {alert && <Alert status={'Success'} alertMsg={alertMsg} />}
            </AnimatePresence>


        {/* Header Section */}
        <header className='w-full flex items-center justify-between px-12 py-4'>
            <div className='flex items-center justify-center gap-6'>
                <Link to={"/home/projects"}>
                    <img className='w-32 h-auto object-contain' alt='' src={LOGO} />
                </Link>
            <div>
                {/* Title */}
                 <div className='flex items-center justify-center gap-3'>
                    <AnimatePresence>
                        {isTitle?
                        (<>
                        <motion.input 
                        key={"TitleInput"} 
                        type='text' 
                        placeholder='Your Title '
                        className='px-3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none'
                        value={Title} 
                        onChange={(e)=> setTitle(e.target.value)}
                        />
                    </>
                    ):(<>
                        <motion.p key={"titleLabel"} className='px-3 py-2 text-white text-lg'>
                            {Title}
                        </motion.p>
                    </>)}

                    </AnimatePresence>

                    <AnimatePresence>{isTitle?(
                        <>
                        <motion.div key={'MdCheck'} whileTap={{scale:0.9}}
                        className='cursor-pointer' onClick={()=> setIsTitle(false)}>
                            <MdCheck className="text-2xl text-emerald-500"/>
                        </motion.div>
                        </>
                        ):(
                        <>
                        <motion.div key={'MdEdit'} whileTap={{scale:0.9}}
                        className='cursor-pointer' onClick={()=> setIsTitle(true)}>
                            <MdEdit className="text-2xl text-emerald-500" />
                        </motion.div>
                        </>
                    )}

                    </AnimatePresence>
                 </div>
                {/* Follow */}
                <div className='flex items-center justify-center px-3 -mt-2 gap-2'>
                    <p className='text-primaryText text-sm'>
                        {user?.displayName ? user?.displayName :`${user?.email.split("@")[0]}`}
                    </p>
                    <motion.p whileTap={{scale:0.9}}
                    className='text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold cursor-pointer'
                    >
                        +Follow
                    </motion.p>
                </div>
            </div>
            </div>

            {/* User Section */}
             {user &&( 
                <div className='flex items-center justify-center gap-4'>
                    <motion.button onClick={saveProgram} 
                        whileTap={{scale:0.9}} 
                        className='px-6 py-4 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md'>
                            Save
                    </motion.button>
                    <UserProfileDetails/>
                </div>
            )} 

        </header>

        {/* Coding section */}
        <div>
            {/* Horizontal section */}
            <SplitPane
            split='horizontal'
            minSize={100}
            maxSize={-100}
            defaultSize={"50%"}
            >
            {/* Top Coding sectio */}
            <SplitPane 
            split='vertical' minSize={500}>
                {/* html code */}
                <div className='w-full h-full flex flex-col items-start justify-start'>
                    <div className='w-full flex items-center justify-between'>
                        <div className='bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500'>
                            <FaHtml5 className='text-xl text-red-500'/>
                            <p className='text-primaryText font-semibold '>HTML</p>
                        </div>
                    {/* icons */}
                    <div className='cursor-poiner flex items-center gap-5 px-4'>
                        <FcSettings className='text-xl'/>
                        <FaChevronDown className='text-xl text-primaryText'/>
                    </div>

                    </div>
                    <div className='w-full px-2'>
                        <CodeMirror
                        value={html}
                        height="600px"
                        extensions={[javascript({ jsx: true })]}
                        onChange={(value,viewupdate)=>{
                            setHtml(value)
                        }}
                        theme={'dark'}
                      />
                    </div>
                </div>


                <SplitPane split='vertical' minSize={500}>
                    {/* Css Code  */}
                    <div className='w-full h-full flex flex-col items-start justify-start'>
                    <div className='w-full flex items-center justify-between'>
                        <div className='bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500'>
                            <FaCss3 className='text-xl text-blue-500'/>
                            <p className='text-primaryText font-semibold '>CSS</p>
                        </div>
                    {/* icons */}
                    <div className='cursor-poiner flex items-center gap-5 px-4'>
                        <FcSettings className='text-xl'/>
                        <FaChevronDown className='text-xl text-primaryText'/>
                    </div>

                    </div>
                    <div className='w-full px-2'>
                        <CodeMirror
                        value={css}
                        height="600px"
                        extensions={[javascript({ jsx: true })]}
                        onChange={(value,viewupdate)=>{
                            setCss(value)
                        }}
                        theme={'dark'}
                      />
                    </div>
                </div>


                    {/* JS Code */}
                    <div className='w-full h-full flex flex-col items-start justify-start'>
                    <div className='w-full flex items-center justify-between'>
                        <div className='bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500'>
                            <FaJs className='text-xl text-yellow-500'/>
                            <p className='text-primaryText font-semibold '>JS</p>
                        </div>
                    {/* icons */}
                    <div className='cursor-poiner flex items-center gap-5 px-4'>
                        <FcSettings className='text-xl'/>
                        <FaChevronDown className='text-xl text-primaryText'/>
                    </div>

                    </div>
                    <div className='w-full px-2'>
                        <CodeMirror
                        value={js}
                        height="600px"
                        extensions={[javascript({ jsx: true })]}
                        onChange={(value,viewupdate)=>{
                            setJs(value)
                        }}
                        theme={'dark'}
                      />
                    </div>
                </div>


                </SplitPane>
            </SplitPane>


            {/* bottom result section */}
            <div className='bg-white  w-full h-full style={{overflow:"hidden", height:"100%"}}'>
                <iframe
                title='Result'
                srcDoc={output}
                style={{border:"none",width:"100%",height:"100%"}}
                />
            </div>
            </SplitPane>
        </div>
    </div>
  )
}

export default NewProject