import './Textanno.css';
import Docx from '../document';
import { BiSolidCloudUpload, BiSolidFileJson } from "react-icons/bi";
import { FaRotateLeft } from "react-icons/fa6";
import { useState, useEffect, useRef } from 'react';
// import { AiFillEdit } from "react-icons/ai";
import { MdInfo } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function Textanno() {
    const [uploader, setUploader] = useState(true);
    const [showInfo, setShowInfo] = useState(false);
    const [fileName, setFileName] = useState('');
    const [fileContent, setFileContent] = useState('');
    const [splitBy, setSplitBy] = useState('line');
    const [splitText, setSplitText] = useState([]);
    const [indexval, setIndexval] = useState(0);
    const [showadd, setShowAdd] = useState(false);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedFragments, setSelectedFragments] = useState({});


    const inputRef = useRef(null);

    const getRandomColor = () => {
        const getMidRangeValue = () => Math.floor(Math.random() * 128);

        const red = getMidRangeValue();
        const green = getMidRangeValue();
        const blue = getMidRangeValue();
        const color = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;

        return color;
    };

    const addTag = () => {
        const newTag = inputRef.current.value.trim();
        if (newTag) {
            const tagWithColor = { text: newTag, color: getRandomColor() };
            setTags([...tags, tagWithColor]);
            inputRef.current.value = "";
            inputRef.current.focus();
        }
    };

    const txtinputfile = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                setFileContent(e.target.result);
                setSplitText([]);
            };
            reader.readAsText(file);
        }
    };

    const removeFile = () => {
        setFileName('');
        setFileContent('');
        setSplitText([]);
        setSelectedFragments({});
        document.getElementById("txtfileinput").value = "";
    };

    const handleSplitText = (value) => {
        let lines;
        if (value === 'line') {
            lines = fileContent.split('\n').filter(line => line.trim() !== '');
        } else if (value === 'empty') {
            lines = fileContent.split(/\n\s*\n/).filter(line => line.trim() !== '');
        } else {
            lines = [fileContent];
        }
        setSplitText(lines);
        setSelectedFragments({});
        setIndexval(0);
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            const confirmationMessage = "Are you sure you want to leave this page? Changes you made may not be saved.";
            event.returnValue = confirmationMessage;
            return confirmationMessage;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        if (fileContent) {
            handleSplitText(splitBy);
        }
    }, [fileContent, splitBy]);

    const handleTextSelection = () => {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        if (selectedText && selectedTag) {
            const currentText = splitText[indexval];
            const startPos = currentText.indexOf(selectedText);
            const endPos = startPos + selectedText.length;

            if (!selectedFragments[indexval]) {
                selectedFragments[indexval] = [];
            }

            if (!selectedFragments[indexval].some(fragment => fragment.text === selectedText && fragment.startPos === startPos)) {
                selectedFragments[indexval].push({
                    text: selectedText,
                    startPos,
                    endPos,
                    tag: selectedTag,
                });

                setSelectedFragments(prev => ({
                    ...prev,
                    [indexval]: selectedFragments[indexval],
                }));
            }

            selection.removeAllRanges();
        }
    };
    const renderHighlightedText = (text) => {
        let renderedText = [];
        let lastEnd = 0;

        const fragmentsForCurrentIndex = selectedFragments[indexval] || [];
        const sortedFragments = fragmentsForCurrentIndex
            .filter(fragment => fragment.startPos >= 0 && fragment.endPos <= text.length)
            .sort((a, b) => a.startPos - b.startPos);

        sortedFragments.forEach((fragment, index) => {
            if (lastEnd < fragment.startPos) {
                renderedText.push(text.slice(lastEnd, fragment.startPos));
            }

            renderedText.push(
                <span
                    key={index}
                    style={{
                        backgroundColor: fragment.tag.color,
                        padding: '0.2em',
                        margin: '0 0.1em',
                        display: 'inline-block',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                    title={fragment.tag.text}
                    onClick={() => removeFragment(fragment)}
                >
                    {fragment.text}
                </span>
            );

            lastEnd = fragment.endPos;
        });

        if (lastEnd < text.length) {
            renderedText.push(text.slice(lastEnd));
        }

        return renderedText;
    };

    const removeFragment = (fragment) => {
        setSelectedFragments(prev => {
            const updatedFragments = { ...prev };
            updatedFragments[indexval] = updatedFragments[indexval].filter(f => f.text !== fragment.text || f.startPos !== fragment.startPos);
            return updatedFragments;
        });
    };


    const handleIndexChange = (index) => {
        setIndexval(index);
    };

    const exportToJson = () => {
        const trainData = splitText.reduce((acc, text, idx) => {
            const entities = selectedFragments[idx] ? selectedFragments[idx].map(fragment => [
                fragment.startPos,
                fragment.endPos,
                fragment.tag.text,
            ]) : [];
            if (entities.length > 0) {
                acc.push([text, { entities }]);
            }

            return acc;
        }, []);

        const json = `Train_data = ${JSON.stringify(trainData, null, 2)};`;
        const blob = new Blob([json], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'annotateme.js';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <div className="textannoouttercon">
                {uploader && (
                    <main className="textannoconinp">
                        <p className='logotxt'>AnnotateMe.</p>
                        <section className="txtfileinput">
                            <div className="innernull">
                                <input type="file" id="txtfileinput" accept=".txt" onChange={txtinputfile} />
                                <p className='uploadicon'><BiSolidCloudUpload /></p>
                                Drag / Choose Text File.
                            </div>
                            {fileName !== '' ? (
                                <div className="innernotnull">
                                    <p className='getstarttxt'>
                                        <span onClick={() => { setUploader(false) }} className="getstartbtn">Get Start</span>
                                        with <b>{fileName}</b>
                                    </p>
                                    <p style={{ position: 'absolute', bottom: '0.5em', right: '1em', cursor: 'pointer' }} onClick={removeFile}>
                                        <FaRotateLeft />
                                    </p>
                                </div>
                            ) : null}
                        </section>
                        {fileName == '' ? (<p style={{ color: 'white', width: '90%', marginTop: '0.5em', color: 'yellow' }}>*Upload your <b>.txt</b> file here.</p>) :
                            (<p style={{ color: 'white', width: '90%', marginTop: '0.5em', color: 'yellow' }}>*Click on <b>Get Start</b> to start annotating.</p>
                            )}
                        <Docx />
                    </main>
                )}
                {/* ---------------------------------------------------------------------------------------------------- */}
                {!uploader && (
                    <main className="txtannopg">
                        <menu className="annotatesidemenu">
                            <div className="annotatesideinner">
                                <p className="annotxtside">AnnotateMe.</p>
                                <select
                                    className='annotatesideinnerselect'
                                    value={splitBy}
                                    onChange={(e) => {
                                        setSplitBy(e.target.value);
                                        handleSplitText(e.target.value);
                                    }}
                                >
                                    <option value="line">Separate by new line</option>
                                    <option value="empty">Separate by empty line</option>
                                </select>
                                <div className="annotatesideinnercountcon">
                                    {Array.from({ length: splitText.length }).map((_, index) => (
                                        <p
                                            onClick={() => handleIndexChange(index)}
                                            key={index}
                                            className={`annotatesideinnercount ${index === indexval ? 'selected' : ''}`}
                                        >
                                            {index + 1}
                                        </p>
                                    ))}
                                </div>
                                <div className="annotatesidetagcon">
                                    <div className="annotatetagstop">
                                        <div className="annotatetagadd">
                                            {!showadd ? (
                                                <p onClick={() => { setShowAdd(true) }} className="annotatetagaddplus">+</p>
                                            ) : (
                                                <>
                                                    <input
                                                        className="annotatetagaddinput"
                                                        type="text"
                                                        placeholder='New tags'
                                                        ref={inputRef}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                addTag();
                                                            }
                                                        }}
                                                    />
                                                    <p className="annotatetagaddplus2" onClick={addTag}>+</p>
                                                </>
                                            )}
                                        </div>
                                        {/* <p className="tagsedit"><AiFillEdit /></p> */}
                                    </div>
                                    {/* <div className="annotatetagslistcontainer">
                                        {tags.length > 0 ? (
                                            tags.map((tag, index) => (
                                                <span
                                                    onClick={() => {
                                                        setSelectedTag(selectedTag?.text === tag.text ? null : { text: tag.text, color: tag.color });
                                                    }}
                                                    key={index}
                                                    className="annotatetag"
                                                    style={{
                                                        backgroundColor: tag.color,
                                                        outline: selectedTag?.text === tag.text ? '2px dashed white' : 'none',
                                                    }}
                                                >
                                                    {tag.text}
                                                </span>
                                            ))
                                        ) : (
                                            <p onClick={() => { setShowAdd(true) }} style={{ opacity: '0.5', padding: '0.5em 0', cursor: 'pointer' }}>Add New tags here +</p>
                                        )}
                                    </div> */}
                                    <div className="annotatetagslistcontainer">
                                        {tags.length > 0 ? (
                                            tags.map((tag, index) => (
                                                <span
                                                    onClick={() => {
                                                        setSelectedTag(selectedTag?.text === tag.text ? null : { text: tag.text, color: tag.color });
                                                    }}
                                                    onDoubleClick={() => {
                                                        if (window.confirm(`⚠️ Delete ${tag.text} ? The selected texts will also be removed.`)) {
                                                            setTags(prevTags => prevTags.filter((_, i) => i !== index));

                                                            setSelectedFragments(prevFragments => {
                                                                const updatedFragments = {};
                                                                Object.keys(prevFragments).forEach(key => {
                                                                    const filteredFragments = prevFragments[key].filter(fragment => fragment.tag.text !== tag.text);

                                                                    if (filteredFragments.length > 0) {
                                                                        updatedFragments[key] = filteredFragments;
                                                                    }
                                                                });

                                                                return updatedFragments;
                                                            });

                                                            if (selectedTag?.text === tag.text) {
                                                                setSelectedTag(null);
                                                            }
                                                        }
                                                    }}
                                                    key={index}
                                                    className="annotatetag"
                                                    style={{
                                                        backgroundColor: tag.color,
                                                        outline: selectedTag?.text === tag.text ? '2px dashed white' : 'none',
                                                    }}
                                                >
                                                    {tag.text}
                                                </span>
                                            ))
                                        ) : (
                                            <p onClick={() => { setShowAdd(true); }} style={{ opacity: '0.5', padding: '0.5em 0', cursor: 'pointer' }}>Add New tags here + <br />
                                                <i style={{ color: '#ff8484', fontSize: 'small' }}>*doubleclick the tag to delete.</i><br /></p>
                                        )}
                                    </div>


                                </div>
                                <p className="annoexport" onClick={exportToJson}>Export as JSON <BiSolidFileJson /></p>
                            </div>
                        </menu>
                        <div className="textplaygroundcon">
                            <div className="textplayground">
                                <div className="playgroundtop">
                                    <p className="filenamepgtop">{fileName}</p>
                                    <p className='infopgtop' onClick={() => { setShowInfo(prev => !prev) }}><MdInfo /></p>
                                    {showInfo && (
                                        <div className="infopgcon">
                                            <p className='infopgtxt'>{/* AnnotateMe is a web-based tool that helps you convert
                                                text into actionable data. Read the 
                                                <Link style={{ color: '#59d0ff', textDecoration: 'underline' }} to='/document'> document </Link> 
                                                for more information. Currently we only have support for Spacy, for BERT and Keras will be updated. */}
                                                <i>Step by step user Guid :</i><br />
                                                <i>Step 1 :</i> Choose the separation method. <br />
                                                <i>Step 2 :</i> Create your tags. <br />
                                                <i style={{ color: '#ff8484' }}>Doubleclick the tag to delete.</i><br />
                                                <i>Step 3 :</i> Click on a tag to select the entities. <br />
                                                <i style={{ color: '#ff8484' }}>Click on an incorrectly selected entity to deselect it.</i><br />
                                                <i>Step 4 :</i> Move to the next index and select entities. <br />
                                                <i>Step 5 :</i> Export as JSON. <br />
                                                <i style={{ color: '#ff8484' }}>* No data is being stored, so please don't close <br /> the tab before exporting. <br />
                                                    Currently, we only support spaCy.</i> <br />
                                                For more information read the <Link style={{ color: '#59d0ff', textDecoration: 'underline' }} to='/document'> document </Link><br />
                                                <a style={{ color: '#7772ED', fontStyle: 'italic', fontSize: 'x-small' }} href="">&bull; Report a bug</a>&emsp;
                                                <a style={{ color: '#7772ED', fontStyle: 'italic', fontSize: 'x-small' }} href="">&bull; Github</a>
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="mainplayground" onMouseUp={handleTextSelection}>
                                    {splitText.length > 0 ? (
                                        <p className="mainplaygroundtxt">
                                            {renderHighlightedText(splitText[indexval])}
                                        </p>
                                    ) : (
                                        <p className="mainplaygroundtxt">
                                            {renderHighlightedText(fileContent)}
                                        </p>
                                    )}
                                    <p className="signature">developed by <a style={{ color: '#59d0ff', textDecoration: 'underline' }} href='https://aadeshsiva.vercel.app/'><i>@aadesh</i></a>.</p>
                                </div>
                            </div>
                        </div>
                    </main>
                )}
            </div>
        </>
    );
}
