import { Book } from "phosphor-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";



export const Event = () => {

    const [ SidebarOpened , setSidebarOpened ] = useState(false);

    const handleOpenSideBar = () => {
        setSidebarOpened(!SidebarOpened);
    }

    const { slug } = useParams<{slug: string}>();

    return(
        <div className="flex flex-col min-h-screen">
            <Header SidebarOpened={handleOpenSideBar} Menu={SidebarOpened}/>
            <main className="flex flex-1 flex-col xl:flex-row overflow-y-hidden relative">
                {slug 
                    ? <Video lessonSlug={slug} /> 
                    : (
                        <div className="flex flex-1 mt-[40vh] justify-center">
                            <div className='flex flex-col items-center'>
                                <Book size={100} className='animate-bounce text-green-300' />
                                <div className="text-3xl uppercase font-bold text-green-300 mt-10 animate-pulse">Selecione uma aula</div>
                            </div>
                        </div>
                    )
                }
                <div className={`w-full xl:w-[348px] bg-gray-700 p-6 border-l border-gray-600 
                               ${SidebarOpened ? 'block absolute top-0 bottom-0 left-0 right-0 z-50' : 'hidden xl:block' }`}>
                    <Sidebar Menu={SidebarOpened} />
                </div>
            </main>
        </div>
    )
};