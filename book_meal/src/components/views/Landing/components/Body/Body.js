import React from 'react';
import Ionicon from 'react-ionicons';

class Body extends React.Component {

    render() {
        return (
            <main>
                <section className="container-fluid text-center mt-4">
                    <header>
                        <h3>About Us</h3>
                    </header>
                    <div className="w-100">
                        <p className="m-auto" style={{maxWidth: '700px' }}>
                            Book a meal allows you to book meals from our daily curated 
                            menu with meals from all over the world. Our chefs 
                            will always leave you wanting more.
                        </p>
                    </div>

                    <header className="mt-5">
                        <h3>How We Work</h3>
                    </header>
                    <p> A brief description on how to get started...</p>
                    <div className="row">
                        <div className="col-md-3 text-md-right">
                            <Ionicon icon="ios-log-in" fontSize="150px" color="#008080" />
                        </div>
                        <div className="col-md-9 text-md-left">
                            <h5>Sign Up!</h5>
                            <p>
                                First, you will have to create an account with us.
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9 text-md-right order-2 order-md-1">
                            <h5>Make An Order!</h5>
                            <p>
                                Then, order as many meals as you wish on the menu set for the day.
                            </p>
                        </div>
                        <div className="col-md-3 text-md-left order-1 order-md-2">
                            <Ionicon icon="ios-pizza" fontSize="150px" color="#008080" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 text-md-right">
                            <Ionicon icon="ios-notifications" fontSize="150px" color="#008080" />
                        </div>
                        <div className="col-md-9 text-md-left">
                            <h5>Get Notified!</h5>
                            <p>
                                Get notified when your meal has been successfully processed
                                by our caterer.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}


export default Body;