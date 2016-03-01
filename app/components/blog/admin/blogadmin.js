import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import Snackbar from 'material-ui/lib/snackbar';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import TimePicker from 'material-ui/lib/time-picker';

const defaults = {
    date: new Date().toString(),
    author: 'Mattias'
};

let BlogAdmin = React.createClass({
    getInitialState() {
        return {
            authed: false,
            username: '',
            password: '',
            secret: '',
            entries: [],
            dialogOpenedEntry: {},
            dialogOpen: false,
            dialogOpenFromNew: false,
            dialogOpenId: '',
            snackbarOpen: false,
            snackbarMessage: ''
        };
    },

    componentDidMount() {
        if (this.state.authed) {
            this.loadBlogPosts();
        }
    },

    loadBlogPosts() {
        const blogUrl = DEBUG ? 'http://localhost:8080/api/blog' : '/api/blog';

        $.ajax({
            url: blogUrl,
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                this.setState({
                    entries: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(blogUrl, status, err.toString());
            }.bind(this)
        });
    },

    handleDateChangePicker(ignored, date) {
        this.state.dialogOpenedEntry.date = date;
        this.setState({
            dialogOpenedEntry: this.state.dialogOpenedEntry
        });
    },

    handleTimeChange(ignored, date) {
        this.state.dialogOpenedEntry.date = date;
        this.setState({
            dialogOpenedEntry: this.state.dialogOpenedEntry
        });
    },

    handleIdChange(e) {
        this.state.dialogOpenedEntry.id = e.target.value;
        this.setState({
            dialogOpenedEntry: this.state.dialogOpenedEntry
        });
    },

    handleTitleChange(e) {
        this.state.dialogOpenedEntry.title = e.target.value;
        this.setState({
            dialogOpenedEntry: this.state.dialogOpenedEntry
        });
    },

    handleBodyChange(e) {
        this.state.dialogOpenedEntry.body = e.target.value;
        this.setState({
            dialogOpenedEntry: this.state.dialogOpenedEntry
        });
    },

    handleAuthorChange(e) {
        this.state.dialogOpenedEntry.author = e.target.value;
        this.setState({
            dialogOpenedEntry: this.state.dialogOpenedEntry
        });
    },

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    },

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    },

    onLoginClick() {
        console.log('Login button clicked');

        let postData = {
            username: this.state.username,
            password: this.state.password
        };

        const authUrl = DEBUG ? 'http://localhost:8080/api/auth' : '/api/auth';

        $.ajax({
            url: authUrl,
            dataType: 'json',
            type: 'POST',
            data: postData,
            success: function (data) {
                this.setState({
                    authed: true,
                    secret: data.secret,
                    snackbarOpen: true,
                    snackbarMessage: 'Sucess logging in: ' + JSON.stringify(data)
                });
                this.loadBlogPosts();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(authUrl, status, err.toString(), JSON.stringify(xhr));
                this.setState({
                    snackbarOpen: true,
                    snackbarMessage: 'Failed logging in: ' + JSON.stringify(xhr)
                });
            }.bind(this)
        });
    },

    dialogNewEntry() {
        console.log('New entry button clicked');
        this.setState({
            dialogOpenedEntry: defaults,
            dialogOpen: true,
            dialogOpenFromNew: true
        });
    },

    dialogEditEntry(entry) {
        console.log('Open entry button clicked');
        this.setState({
            dialogOpenedEntry: JSON.parse(JSON.stringify(entry)),
            dialogOpen: true,
            dialogOpenFromNew: false,
            dialogOpenId: entry.id
        });
    },

    dialogCancel() {
        console.log('Cancel dialog button clicked');
        this.setState({
            dialogOpenedEntry: {},
            dialogOpen: false
        });
    },

    dialogDelete() {
        console.log('Delete dialog button clicked');

        let postData = {
            id: this.state.dialogOpenedEntry.id,
            auth: this.state.secret
        };

        const deleteEntryUrl = DEBUG ? 'http://localhost:8080/api/blog' : '/api/blog';

        $.ajax({
            url: deleteEntryUrl,
            dataType: 'json',
            type: 'DELETE',
            data: postData,
            success: function (data) {
                this.setState({
                    dialogOpenedEntry: {},
                    dialogOpen: false,
                    snackbarOpen: true,
                    snackbarMessage: 'Sucess deleting entry'
                });
                this.loadBlogPosts();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(deleteEntryUrl, status, err.toString(), JSON.stringify(xhr));
                this.setState({
                    snackbarOpen: true,
                    snackbarMessage: 'Failed deleting entry: ' + JSON.stringify(xhr)
                });
            }.bind(this)
        });
    },

    dialogSaveEntry() {
        console.log('Save dialog button clicked');

        let postData = this.state.dialogOpenedEntry;
        postData.auth = this.state.secret;
        postData.isNew = this.state.dialogOpenFromNew;
        postData.isIdUpdate = !this.state.dialogOpenFromNew && this.state.dialogOpenedEntry.id !== this.state.dialogOpenId;

        const saveEntryUrl = DEBUG ? 'http://localhost:8080/api/blog' : '/api/blog';

        $.ajax({
            url: saveEntryUrl,
            dataType: 'json',
            type: 'PUT',
            data: postData,
            success: function (data) {
                this.setState({
                    dialogOpenedEntry: {},
                    dialogOpen: false,
                    snackbarOpen: true,
                    snackbarMessage: 'Sucess while saving data: ' + JSON.stringify(data)
                });
                this.loadBlogPosts();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(saveEntryUrl, status, err.toString(), JSON.stringify(xhr));
                this.setState({
                    snackbarOpen: true,
                    snackbarMessage: 'Failed while saving entry: ' + JSON.stringify(xhr)
                });
            }.bind(this)
        });
    },

    closeSnackbar() {
        this.setState({
            snackbarOpen: false
        });
    },

    onRowSelection(selectedRows) {
        console.log('Row selected: ' + JSON.stringify(selectedRows));

        if (selectedRows.length > 0) {
            this.dialogEditEntry(this.state.entries[selectedRows[0]]);
        }
    },

    getTableRows() {
        return this.state.entries.map(function (entry) {
            return (
                <TableRow
                    key={entry.id}>
                    <TableRowColumn>
                        {entry.date}
                    </TableRowColumn>
                    <TableRowColumn>
                        {entry.id}
                    </TableRowColumn>
                    <TableRowColumn>
                        {entry.title}
                    </TableRowColumn>
                    <TableRowColumn>
                        {entry.body}
                    </TableRowColumn>
                    <TableRowColumn>
                        {entry.author}
                    </TableRowColumn>
                </TableRow>
            );
        }, this);
    },

    getViews() {
        if (this.state.authed) {
            return this.getAuthedViews();
        }
        else {
            return this.getNonAuthedViews();
        }
    },

    getNonAuthedViews() {
        const styles = {
            button: {
                margin: 20
            },
            dialogTextField: {
                margin: 20
            }
        };

        return (
            <div>
                <TextField
                    style={styles.dialogTextField}
                    floatingLabelText="Username"
                    type="password"
                    onChange={this.handleUsernameChange}
                    value={this.state.username}/>
                <TextField
                    style={styles.dialogTextField}
                    floatingLabelText="Password"
                    type="password"
                    onChange={this.handlePasswordChange}
                    value={this.state.password}/>
                <RaisedButton
                    style={styles.button}
                    secondary={true}
                    onTouchTap={this.onLoginClick}
                    label="Login"/>
            </div>
        );
    },

    getAuthedViews() {
        const styles = {
            h1: {
                margin: 20
            },
            button: {
                margin: 20
            },
            dialogTextField: {
                width: '100%'
            }
        };

        const actions = [
            <RaisedButton
                label="Delete"
                primary={true}
                onTouchTap={this.dialogDelete}/>,
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.dialogCancel}/>,
            <FlatButton
                label="Save"
                primary={true}
                onTouchTap={this.dialogSaveEntry}/>
        ];

        return (
            <div>
                <h1
                    style={styles.h1}>
                    Hi. If you made it this far, please post something funny to let me know.
                </h1>
                <RaisedButton
                    style={styles.button}
                    secondary={true}
                    onTouchTap={this.dialogNewEntry}
                    label="New"/>
                <Table
                    onRowSelection={this.onRowSelection}>
                    <TableHeader
                        enableSelectAll={false}
                        adjustForCheckbox={true}>
                        <TableRow>
                            <TableHeaderColumn>
                                Date
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                Id
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                Title
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                Body
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                Author
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}>
                        {this.getTableRows()}
                    </TableBody>
                </Table>
                <Dialog
                    title={this.state.dialogOpenFromNew ? "New blog entry" : "Edit blog entry"}
                    actions={actions}
                    modal={true}
                    autoScrollBodyContent={true}
                    open={this.state.dialogOpen}>
                    <DatePicker
                        hintText="Date"
                        onChange={this.handleDateChangePicker}
                        value={this.state.dialogOpenedEntry.date ? new Date(this.state.dialogOpenedEntry.date) : new Date()}/>
                    <TimePicker
                        format="24hr"
                        hintText="Time"
                        onChange={this.handleTimeChange}
                        defaultTime={this.state.dialogOpenedEntry.date ? new Date(this.state.dialogOpenedEntry.date) : new Date()}/>
                    <TextField
                        style={styles.dialogTextField}
                        floatingLabelText="Id"
                        onChange={this.handleIdChange}
                        value={this.state.dialogOpenedEntry.id}/>
                    <br/>
                    <TextField
                        style={styles.dialogTextField}
                        floatingLabelText="Title"
                        onChange={this.handleTitleChange}
                        value={this.state.dialogOpenedEntry.title}/>
                    <br/>
                    <TextField
                        style={styles.dialogTextField}
                        floatingLabelText="Body"
                        multiLine={true}
                        onChange={this.handleBodyChange}
                        value={this.state.dialogOpenedEntry.body}/>
                    <br/>
                    <TextField
                        style={styles.dialogTextField}
                        floatingLabelText="Author"
                        onChange={this.handleAuthorChange}
                        value={this.state.dialogOpenedEntry.author}/>
                </Dialog>
            </div>
        );
    },

    render() {
        const styles = {
            container: {
                paddingTop: 64,
                width: '100%'
            }
        };

        return (
            <div
                style={styles.container}>
                {this.getViews()}
                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.snackbarMessage}
                    autoHideDuration={3000}
                    onRequestClose={this.closeSnackbar}/>
            </div>
        );
    }
});

export default BlogAdmin;