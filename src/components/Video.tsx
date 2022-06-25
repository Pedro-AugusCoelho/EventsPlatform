import { DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, DiscordLogo, FileArrowDown, Lightning , CircleDashed } from "phosphor-react";
import { gql, useQuery } from "@apollo/client";

import '@vime/core/themes/default.css';


const GET_LESSON_BY_SLUG = gql`
query GetLessonBySlug($slug:String) {
    lesson(where: {slug: $slug}) {
    title
    videoId
    description
    teacher {
      name
      avatarURL
      bio
    }
  }
}
`
interface GetLessonBySlugResponse {
    lesson:{
    title:string
    videoId:string
    description:string
    teacher:{
      name:string
      avatarURL:string
      bio:string
    }
    }
}

interface VideoProps {
    lessonSlug: string;
}

export const Video = ({lessonSlug}:VideoProps) => {

    const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG , {
        variables:{
            slug:lessonSlug
        }
    });

    if(!data){
        return (
            <div className="w-[1100px] flex items-center justify-center">
                <CircleDashed size={100} className="animate-spin" />
            </div>
        )
    }

    return(
        <div className="flex-1">
            <div className="bg-black flex justify-center">
                <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
                    <Player>
                        <Youtube videoId={data.lesson.videoId}/>
                        <DefaultUi />
                    </Player>
                </div>
            </div>

            <div className="p-3 xl:p-6 max-w-[1100px] mx-auto">
                
                <div className="flex flex-col lg:flex-row items-start gap-16 ">
                    
                    <div className="flex-1">
                        
                        <h1 className="text-2xl font-bold">
                            {data.lesson.title}
                        </h1>
                        
                        <p className="mt-4 text-gray-200 leading-relaxed">
                            {data.lesson.description}
                        </p>

                        {data.lesson.teacher && (
                        <div className="flex items-center gap-4 mt-6">
                            
                            <img 
                            className="h-16 w-16 rounded-full border-2 border-blue-500"
                            src={data.lesson.teacher.avatarURL} 
                            alt='Educator' 
                            />
                            
                            <div className="leading-relaxed">
                                <strong className="font-bold block text-2xl">{data.lesson.teacher.name}</strong>
                                <span className="text-gray-200 text-sm block">{data.lesson.teacher.bio}</span>
                            </div>
                        </div>
                        )}

                    
                    </div>
                    
                    <div className="flex flex-col w-full lg:flex-[0.5] gap-4">
                        
                        <a href="" className="p-4 text-small bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors">
                            <DiscordLogo size={24} />
                            Comunidade do discord
                        </a>

                        <a href="" className="p-4 text-small flex items-center rounded border border-blue-500 text-blue-500 font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors">
                            <Lightning size={24} />
                            Acesse o desafio
                        </a>
                    
                    </div>
                
                </div>
                
                <div className="gap-8 mt-20 grid grid-cols-1 lg:grid-cols-2">
                    
                    <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
                        
                        <div className="bg-green-600 h-full flex items-center p-6">
                            <FileArrowDown size={40} />
                        </div>
                        
                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl">Material Complementar</strong>
                            <p className="text-sm text-gray-200 mt-2">
                                Acesse o material complementar para acelerar o seu desenvolvimento
                            </p>
                        </div>
                    </a>

                    <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
                        <div className="bg-green-600 h-full flex items-center p-6">
                            <FileArrowDown size={40} />
                        </div>
                        
                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl">Wallpaper Exclusivos</strong>
                            <p className="text-sm text-gray-200 mt-2">
                                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
                            </p>
                        </div>
                    </a>

                   
                </div>
            
            </div>
        
        </div>
    )
};