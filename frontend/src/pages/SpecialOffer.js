import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Special(props){
    const [modal,showmodal] = getState(false)
    return <div>
        <Header {...props} />
        <div>
        <h3 className="tittle-w3l">Special Offer Page</h3>
        </div>
        <div>
            <button>Special Offer 1</button>
            <button>Special Offer 2</button>
            <button>Special Offer 3</button>
        </div>

        <Footer />
    </div>
}

export default Special