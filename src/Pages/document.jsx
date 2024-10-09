import '../App.css'
import tutorialVideo from '../assets/tutorial.mp4'
export default function docx() {
    return (
        <>
            <div className="doxcon">
                <h2 className="doxmainhead">NER Annotation Tool Documentation</h2>
                <p className="doxhead">Overview</p>
                <p className='doxtxt'>
                    This project is a tool for annotating Named Entities in text files, currently supported for the spaCy library.
                    The tool allows users to input a text file, annotate entities, and export the results as <b>JSON</b> or <b>JavaScript</b> objects.
                    It is an <strong>open-source</strong> project, and contributions are welcome.
                </p>

                <p className="doxhead">Features</p>
                <ul className='doxlist'>
                    <li><strong>Text input :</strong> Upload a text file for annotation.</li>
                    <li><strong>Customizable Tags :</strong> Define and create your own entity tags.</li>
                    <li><strong>Interactive Annotation :</strong> Select and deselect entities by clicking on them.</li>
                    <li><strong>Export :</strong> Export the annotated data as <strong>JSON</strong> format.</li>
                    <li><strong>spaCy Support :</strong> Compatible with spaCy’s NER model for now.</li>
                </ul>

                <p className="doxhead"><i>How to Use the Tool</i></p>
                <div className="doxtut">
                    <video loop autoPlay>
                        <source src={tutorialVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <ol className='doxlist'>
                    <li><strong>Step 1 :</strong> Upload Text File - Load the text file you want to annotate.</li>
                    <li><strong>Step 2 :</strong> Define Your Tags - Choose the separation method and create your tags for entity annotation. Double-click a tag to delete it if necessary.</li>
                    <li><strong>Step 3 :</strong> Select Entities - Click on a tag to select it. Highlight the corresponding entities in the text by clicking on them. To deselect an incorrectly selected entity, click on it again.</li>
                    <li><strong>Step 4 :</strong> Navigate and Annotate - Move through the text to annotate all the entities as required.</li>
                    <li><strong>Step 5 :</strong> Export Annotations - Once done, export your annotations as a <strong>JSON</strong> file.</li>
                </ol>

                <p className="doxnote" style={{ color: '#ff8484' }}>
                    <strong>Note:</strong> No data is stored on the server, so ensure you export the file before closing the tab.
                </p>
                <p className="doxtxt">
                    <i>Currently, the tool only supports the <strong>spaCy</strong> library.</i>
                </p>

                <p className="doxhead"><i>Future Work</i></p>
                <ul className='doxlist'>
                    <li>Add support for more NER libraries.</li>
                    <li>Enable saving annotations locally for later edits.</li>
                </ul>

                <p className="doxhead">License</p>
                <p className='doxtxt'>
                    This project is licensed under the MIT License. It is an <strong>open-source</strong> project, and contributions are encouraged.
                    If you would like to contribute, please follow the contribution guidelines provided in the repository.
                </p>
            </div>
        </>
    );
}
