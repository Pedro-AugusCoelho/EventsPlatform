import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.svg';
import Rockeseat from '../assets/Logo-rockseat.svg';


const CREATE_SUBSCRIBE_MUTATION = gql`
    mutation CreateSubscriber($name:String! , $email:String!) {
    createSubscriber(data: {name: $name, email: $email}) {
        id
    }
}
`

export const Subscribe = () => {

    const navigate = useNavigate();
    
    const [name , setName ]   = useState('');
    const [email , setEmail ] = useState('');
    const [createSubscriber , {loading}] = useMutation(CREATE_SUBSCRIBE_MUTATION);

    async function HandleSubscribe(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        await createSubscriber({
            variables:{
                name,
                email
            }
        })
        navigate('/event');
    };
    
    return(
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
            <div className="max-w-[1100px] w-full flex flex-col items-center justify-between mt-5 mx-auto xl:flex-row xl:mt-10">
                
                <div className="max-w-[640px] m-[5%]">
                    
                    <div className='w-full flex justify-center xl:justify-start'>
                        <img src={Logo} alt=""/>
                    </div>
                    
                    <h1 className='mt-8 text-[2.5rem] leading-tight text-center xl:text-justify'>
                        Construa uma <strong className='text-blue-500'>aplicação completa</strong>, do zero, com <strong  className='text-blue-500'>React.</strong>
                    </h1>
                    
                    <p className='mt-4 text-gray-400 leading-relaxed text-center xl:text-justify'> 
                        Em apenas uma semana você vai dominar na 
                        prática uma das tecnologias mais utilizadas e 
                        com alta demanda para acessar as melhores 
                        oportunidades do mercado.
                    </p>
                
                </div>
                
                
                <div className='p-8 bg-gray-700 border w-full border-gray-500 rounded mt-10 md:w-3/4 xl:mt-0 xl:w-auto'>
                    <strong className='text-2xl block m-6 text-center'>
                        Increva-se gratuitamente
                    </strong>
                    
                    <form onSubmit={HandleSubscribe} className='flex flex-col gap-2 w-full'>
                        <input 
                            className='bg-gray-900 rounded p-5 h-14'
                            type="text" 
                            placeholder='Seu nome completo'
                            onChange={e => setName(e.target.value)}
                        />
                        
                        <input 
                            className='bg-gray-900 rounded p-5 h-14'                           
                            type="email"
                            placeholder='Digite seu email' 
                            onChange={e => setEmail(e.target.value)}
                        />

                        <button
                            className='mt-4 bg-green-500 uppercase rounded py-4 font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50'
                            disabled={loading}
                            type='submit'
                        >
                        Garanta minha vaga
                        </button>
                    
                    </form>
                </div>  
            
            
            </div>
            
            <img src="/src/assets/GroupBackground.png" alt="" className="mt-10" />

            <div className='flex flex-col xl:flex-row text-center justify-between items-center w-full bg-black p-4 border-t-[1px] border-gray-400'>
                
                <div className='flex flex-col xl:flex-row justify-center items-center gap-3'>
                    <img src={Rockeseat} alt='Logo Rockeseat' className='w-auto h-6' />
                    <p className='text-gray-500 text-sm'>Rocketseat - Todos os direitos reservados</p>
                </div>
                
                <p className='text-gray-500 text-sm'>Políticas de privacidade</p>
            </div>
        
        </div>
    )
}