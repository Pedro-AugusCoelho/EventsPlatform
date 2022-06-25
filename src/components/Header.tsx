import Logo from '../assets/Logo.svg';
import { Book , BookOpen } from 'phosphor-react';

interface HeaderProps {
    SidebarOpened: () => void;
    Menu: boolean;
}


export const Header = ({ SidebarOpened , Menu }:HeaderProps) => {
    
    
    return(
        <header className='w-full px-[5%] py-[2%] flex items-center justify-between xl:justify-center bg-gray-700 border-b border-gray-600'>
            
            <div className=''>
                <img src={Logo} alt=''/>
            </div>
            
            <div onClick={SidebarOpened} className='flex justify-center items-center xl:hidden'>
                {Menu
                ?<BookOpen size={50} />
                
                :<Book size={50} />
                }
            </div>
        
        </header>
    )
};

