import React from 'react'
import Header from '../components/website/Header'
import Footer from '../components/website/Footer'


const WebsiteLayout = (props) => {
    return (
        <div>
           <Header/>
           <main>
                <div className="container">
                    {props.children}
                </div>
            </main> 
        </div>
    )
}

export default WebsiteLayout
