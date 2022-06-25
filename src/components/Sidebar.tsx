import { gql, useQuery } from "@apollo/client";
import { Lesson } from "./Lesson";

const GET_LESSONS_QUERY = gql`
    query{
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
        id
        lessonType
        availableAt
        title
        slug
  }
}
`

interface GetLessonQueryResponse {
    lessons:{
        id:string,
        lessonType:'live' | 'class',
        availableAt:string,
        title:string,
        slug:string
    }[]
}

interface SidebarProps {
    Menu:boolean;
}

export const Sidebar = ({ Menu }:SidebarProps) => {
    
    const { data } = useQuery<GetLessonQueryResponse>(GET_LESSONS_QUERY);

    if(!data){
        return(
            
            <aside>
                
                <span className="text-center font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
                    Cronograma de aulas
                </span>

                <div className="flex flex-col gap-8">
            
                    <div className="rounded bg-gray-500 p-4 mt-2 animate-pulse">
                        <header className="h-11" />  
                    </div>

                    <div className="rounded bg-gray-500 p-4 mt-2 animate-pulse">
                        <header className="h-11" />  
                    </div>

                    <div className="rounded bg-gray-500 p-4 mt-2 animate-pulse">
                        <header className="h-11" />  
                    </div>

                    <div className="rounded bg-gray-500 p-4 mt-2 animate-pulse">
                        <header className="h-11" />    
                    </div>
                
                </div>
           
            </aside>
        )
    }
    
    return(
        <aside>
            
            <span className="text-center xl:text-left uppercase font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
                Cronograma de aulas
            </span>

            <div className="flex flex-col gap-8">
                {data?.lessons.map(lesson => (
                    <Lesson 
                    key={lesson.id}
                    title={lesson.title}
                    slug={lesson.slug}
                    AvailableAt={new Date(lesson.availableAt)}
                    type={lesson.lessonType}
                    />
                ))

                }
            </div>



        </aside>
    )
};