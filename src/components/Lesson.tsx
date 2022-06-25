import { CheckCircle , Lock} from 'phosphor-react';
import { isPast , format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Link, useParams } from 'react-router-dom';



interface LessonProps {
    title:string,
    slug:string,
    AvailableAt:Date,
    type:'live' | 'class';
}

export const Lesson = ({AvailableAt ,slug ,title ,type}:LessonProps) => {

    const { slug:slugParams } = useParams<{slug:string}>();

    const isActive = slugParams === slug;
    
    const isAvailable = isPast(AvailableAt);
    const availableDateFormatted = format(AvailableAt , "EEEE' * 'd ' de 'MMMM' * 'k'h'mm", {
        locale:ptBR,
    });
    
    return(
        <Link to={`/event/lesson/${slug}`} className='group'>
            <span className="text-gray-300"> 
                {availableDateFormatted}
            </span>
            
            <div className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isActive ? 'bg-green-500' : '' }`}>
                <header className="flex items-center justify-between">
                
                    {isAvailable 
                    ?   
                    (<span className={`text-sm font-medium flex items-center gap-2 ${isActive ? 'text-white' : 'text-blue-500' }`}>
                        <CheckCircle size={20} />
                        Conteúdo Liberado
                    </span>)
                    :
                    (<span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                        <Lock size={20} />
                        Em Breve
                    </span>)
                    }
                    
                    <span className={`text-xs rounded px-2 py-[2px] text-white border font-bold ${isActive ? 'border-white' : 'border-green-300' }`}>
                        {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                
                </header>

                <strong className={`mt-5 block ${isActive ? 'text-white' : 'text-gray-200' }`}>
                    {title}
                </strong>
            </div>
        </Link>
    )
};