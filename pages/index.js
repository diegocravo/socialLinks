import React from 'react';
import Prismic from 'prismic-javascript';

const Index = ({data}) => {
    console.log('client');
    return (
        <div style={{ backgroundColor: data.corfundo, color: data.cortexto}}>
            <h1>Social Linker</h1>
            <ul>
                {data.body.map((item) => {
                    return (
                        <li>
                            <a href={item.primary.destino.url}>{item.primary.texto_do_botao}</a>
                        </li>
                    );
                })}

            </ul>
            <pre>{JSON.stringify(data, null, 2)}</pre>
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