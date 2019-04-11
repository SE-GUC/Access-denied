import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import blue from "@material-ui/core/colors/blue";

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
};

class SimpleDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.chats = this.props.chats;
  }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;
    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="simple-dialog-title">Select a chat..</DialogTitle>
        <div>
          <List>
            {this.props.chats.map(chat => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(chat)}
                key={chat}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={chat} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class SimpleDialogDemo extends React.Component {
  constructor(props) {
    super(props);
    this.chats = this.props.chats;
    this.state = {
      open: false,
      selectedValue: null
    };
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
    this.props.handleChat(value);
  };

  render() {
    return (
      <div>
        <Button
          id="chatsbtn"
          variant="outlined"
          color="primary"
          hidden={true}
          onClick={this.handleClickOpen}
        >
          Chats
        </Button>
        <SimpleDialogWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
          chats={this.props.chats}
        />
      </div>
    );
  }
}

export default SimpleDialogDemo;
