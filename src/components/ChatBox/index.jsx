import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const ChatBoxBottomAppbar = React.lazy(() => import("./ChatBoxBottomAppbar"));

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        height: '100vh',
        '& > *': {
            width: '100%',
            height: '100%',
            backgroundColor: '#ededed'
        },
    },
}));

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export default function ChatBox(props) {

    const classes = useStyles();

    const [config, setConfig] = useState({
        lang: 'en-US',
        interimResults: false,
    })
    
    const [text, setText] = useState('');
    useEffect(() => {
        console.log(text);
      });

    function startSpeechRecognition() {
        const recognition = new SpeechRecognition();

        recognition.interimResults = config.interimResults;
        recognition.lang = config.lang;

        recognition.start();

        recognition.addEventListener('speechstart', () => {
            console.log('Speech has been detected.');
        });

        recognition.onresult = (e) => {
            let last = e.results.length - 1;
            let text = e.results[last][0].transcript;

            console.log('Confidence: ' + e.results[0][0].confidence);
            console.log('Text: ' + text);

            setText(text);
        };


        recognition.addEventListener('speechend', () => {
            console.log('Speech has been stop.');
            recognition.stop();
        });
        
    }

    return (
        <div className={classes.root}>
            <Paper elevation={0}>
                {text}
                <ChatBoxBottomAppbar handleOnClick={startSpeechRecognition} />
            </Paper>
        </div>
    );
}
