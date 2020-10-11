import React from 'react';
import Prismic from 'prismic-javascript';
import Head from 'next/head';

const Index = ({data}) => {
    return (
        <div style={{ backgroundColor: data.corfundo, color: data.cortexto}}>
            <Head>
                <title>{data.pagetitle}</title>
            </Head>
            <div className='w-1/2 mx-auto text-center p-8' >
                <h1 className='font-bold text-4xl'>{data.title}</h1>
                <img src={data.logo.url} className='mx-auto rounded-full shadow-2xl w-1/4'></img>
                    {data.body.map((item) => {
                        if (item.slice_type === "img"){
                            //return <pre>{JSON.stringify(data, null, 2)}</pre>;
                            return <img src={item.primary.img.url} className='mx-auto w-1/4'/>;
                        }
                        if (item.slice_type === "secao"){
                            return <h2 className='font-bold text-2xl pt-4'>{item.primary.nome}</h2>;
                        }
                        if (item.slice_type === "link"){
                            return (
                                <div>
                                    <a className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block m-2' href={item.primary.destino.url}>{item.primary.texto_do_botao}</a>
                                </div>
                            );
                        }
                        return null;
                    })}
                <div className='text-center py-4'>
                DRCT<br />
                Código fonte disponível em: 
            </div>
            </div>
        </div>
    )
};

export async function getServerSideProps(){
    console.log('server');
    const client = Prismic.client('https://drct.cdn.prismic.io/api/v2');
    const  centralLinks = await client.getSingle('centrallinks');
    console.log(centralLinks);
    return {
        props:{
            data: centralLinks.data,
        }
    }
}

export default Index;