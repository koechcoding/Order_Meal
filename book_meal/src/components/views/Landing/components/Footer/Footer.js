import React from 'react';
import './styles.css';

class Footer extends React.Component {
    render() {
        return (
            <footer className="container-fluid bg-teal patterns mt-5 text-center p-5">
                <p className="p-4 m-auto text-center w-50">
                    Andela Developer Challenge<br/>
                    Made with &lt;3 by Kelvin Koech.
                </p>
            </footer>
        );
    }
}

export default Footer