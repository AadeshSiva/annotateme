import './Pages.css'
import BG from '../assets/fish.mp4'
import { GoArrowUpRight } from "react-icons/go";
import { Link } from 'react-router-dom';
export default function Intro() {
    return (
        <>
            <div className="container">
                <p className='logotxt'>AnnotateMe.</p>
                <video autoPlay loop muted className='BG-Video'>
                    <source src={BG} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="introcontainer">
                    <div className="txtcon">
                        <h1 className='introtxt'>Your Data, Your Annotations.</h1>
                        <Link to="/textannotiate" className='getstarted'>Get Started <GoArrowUpRight /></Link>
                    </div>
                </div>

            </div>
        </>
    )
}