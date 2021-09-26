import React, { forwardRef } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Fab from '@material-ui/core/Fab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DescriptionIcon from '@material-ui/icons/Description';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function ChatBoxBottomAppBar({
  handleOnClick,
  onChangeConfigLang,
  ...props
}, ref) {
  const classes = useStyles();

  const [inputText, setInputText] = React.useState('');
  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (lang) => {
    onChangeConfigLang(lang)
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/**功能導覽列 AppBar */}
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          {/**語音操作按鍵 */}
          <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={handleOnClick}>
            <SettingsVoiceIcon />
          </Fab>
          {/**訊息輸入欄 */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SpeakerNotesIcon />
            </div>
            <InputBase
              placeholder="輸入對話訊息"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={inputText}
              onChange={handleChange}
            />
          </div>
          <div className={classes.grow} />
          <IconButton color="inherit"
            ref={anchorEl}
            onClick={handleMenuClick}
          >
            <DescriptionIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => handleMenuClose('cmn-Hant-TW')}>Chinese</MenuItem>
            <MenuItem onClick={() => handleMenuClose('en-US')}>English</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default forwardRef(ChatBoxBottomAppBar)
