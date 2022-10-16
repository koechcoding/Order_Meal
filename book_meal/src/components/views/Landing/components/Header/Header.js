import React from 'react';
import { Link} from 'react-router-dom';
import Typed from 'react-typed';
import './styles.css';

class Header extends React.Component{
     render(){
        const strings =[
            "Welcome to yummy stuff!",
            "Welcome to where food lives!",
            "Welcome to book a meal."
        ];
        
        const settings = {
            strings,
            startDelay: 200,
            typeSpeed: 50,
            backSpeed: 40,
            showCursor: false,
        }

        return(
            <header className="welcome">
                <nav className='container'>
                    <div className="row pt-md-5 pt-0">
                    <div className="col-12 col-md-8 offset-md-2 pt-0">
                            <h1 className="animated fadeInUp logo text-flav pb-md-3">
                                BAM!
                            </h1>
                            <h3 id="slogan" className="animated fadeInDown text-flav mb-md-4">
                                <Typed {...settings} />
                            </h3>
                        </div>
                    </div>
                    <div className='row mt-md-2 mt-2'>
                    <div className="col-6">
                            <Link to="/sign-up" className="animated fadeInLeft btn btn-primary btn-lg float-right">
                                Sign Up
                            </Link>
                        </div>
                        <div className="col-6">
                            <Link to="/login" className="animated fadeInRight btn btn-primary btn-lg float-left">
                                Log In
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
        );
     }
}

export default Header;