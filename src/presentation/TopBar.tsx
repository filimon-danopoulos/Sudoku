import React, { Component } from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { DIFFICULTY } from '../models/Difficulty';
import { changeDifficulty, validateSolution, createNewGame, toggleNightMode, resetSudoku, fillCandidates, clearCandidates } from '../store/actions';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Collapse from '@material-ui/core/Collapse';
import CollapseIcon from '@material-ui/icons/ExpandLess';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NewIcon from '@material-ui/icons/Casino'
import ResetIcon from '@material-ui/icons/Replay'
import HelpIcon from '@material-ui/icons/Help'
import DifficultyIcon from '@material-ui/icons/FitnessCenter'
import UpdateIcon from '@material-ui/icons/SyncProblem'
import VeryEasyIcon from '@material-ui/icons/LooksOne'
import EasyIcon from '@material-ui/icons/LooksTwo'
import MediumIcon from '@material-ui/icons/Looks3'
import HardIcon from '@material-ui/icons/Looks4'
import VeryHardIcon from '@material-ui/icons/Looks5'
import ValidateIcon from '@material-ui/icons/CheckCircle'
import ShowCandidatesIcon from '@material-ui/icons/AddCircle'
import RemoveCandidatesIcon from '@material-ui/icons/RemoveCircle'


const styles = (theme: Theme) => createStyles({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    color: theme.palette.type === "dark" ? theme.palette.primary.contrastText : theme.palette.secondary.main,
  },
  drawerList: {
    paddingTop: 0
  },
  drawerPaper: {
    [theme.breakpoints.down('xs')]: {
      minWidth: '70%'
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: '40%'
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: '30%'
    }
  },
  listHeader: {
    backgroundColor: theme.palette.background.default,
    textTransform: "uppercase"
  },
  notesToggle: {
    color: theme.palette.common.white
  },
  nested: {
    paddingLeft: theme.spacing.unit * 9
  },
  subMenuButton: {
    color: theme.palette.type === "dark" ? theme.palette.primary.contrastText : theme.palette.grey[600]
  }
});

export interface ITopBarProps extends WithStyles<typeof styles> {
  difficulty: DIFFICULTY;
  changeDifficulty: typeof changeDifficulty;
  validateSolution: typeof validateSolution;
  createNewGame: typeof createNewGame;
  toggleNightMode: typeof toggleNightMode;
  nightMode: boolean;
  resetSudoku: typeof resetSudoku;
  fillCandidates: typeof fillCandidates;
  clearCandidates: typeof clearCandidates;
}
export interface ITopBarState {
  drawerOpen: boolean;
  difficultyOpen: boolean;
  helpOpen: boolean;
}

const DIFFICUTIES = [{
  difficulty: DIFFICULTY.VeryEasy,
  label: "Very Easy",
  icon: <VeryEasyIcon />
}, {
  difficulty: DIFFICULTY.Easy,
  label: "Easy",
  icon: <EasyIcon />
}, {
  difficulty: DIFFICULTY.Normal,
  label: "Medium",
  icon: <MediumIcon />
}, {
  difficulty: DIFFICULTY.Hard,
  label: "Hard",
  icon: <HardIcon />
}, {
  difficulty: DIFFICULTY.VeryHard,
  label: "Very Hard",
  icon: <VeryHardIcon />
}]

class TopBar extends Component<ITopBarProps, ITopBarState> {
  constructor(props: ITopBarProps) {
    super(props);
    this.state = {
      drawerOpen: false,
      difficultyOpen: false,
      helpOpen: false
    }
  }

  public render(): JSX.Element {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" onClick={() => this.openDrawer()}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {this.getBarText()}
            </Typography>
            <FormControlLabel
              classes={{ label: classes.notesToggle }}
              label="Night mode"
              labelPlacement="start"
              onClick={() => this.props.toggleNightMode()}
              control={<Switch checked={this.props.nightMode} />}
            />
          </Toolbar>
        </AppBar>
        <Drawer variant="temporary" classes={{ paper: classes.drawerPaper }} open={this.state.drawerOpen} onClose={() => this.closeDrawer()}>
          <div className={classes.drawerHeader}>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Options
              </Typography>
            <IconButton onClick={() => this.closeDrawer()}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <List className={classes.drawerList}>
            <ListSubheader className={classes.listHeader}>Puzzle</ListSubheader>
            <ListItem button onClick={() => this.createNewGame()}>
              <ListItemIcon>
                <NewIcon />
              </ListItemIcon>
              <ListItemText primary="New puzzle" />
            </ListItem>
            <ListItem button onClick={() => this.reset()} >
              <ListItemIcon>
                <ResetIcon />
              </ListItemIcon>
              <ListItemText primary="Reset puzzle" />
            </ListItem>
            <ListItem button onClick={() => this.toggleHelp()}>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Help" />
              {this.state.helpOpen ?
                <CollapseIcon className={classes.subMenuButton} /> :
                <ExpandIcon className={classes.subMenuButton} />
              }
            </ListItem>
            <Collapse in={this.state.helpOpen} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItem className={this.props.classes.nested} button onClick={() => this.validate()} >
                  <ListItemIcon>
                    <ValidateIcon />
                  </ListItemIcon>
                  <ListItemText primary="Validate" />
                </ListItem>
                <ListItem className={this.props.classes.nested} button onClick={() => this.fillCandidates()} >
                  <ListItemIcon>
                    <ShowCandidatesIcon />
                  </ListItemIcon>
                  <ListItemText primary="Show candidates" />
                </ListItem>
                <ListItem className={this.props.classes.nested} button onClick={() => this.clearCandidates()} >
                  <ListItemIcon>
                    <RemoveCandidatesIcon />
                  </ListItemIcon>
                  <ListItemText primary="Remove candidates" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={() => this.toggleDifficulty()}>
              <ListItemIcon>
                <DifficultyIcon />
              </ListItemIcon>
              <ListItemText primary="Difficulty" />
              {this.state.difficultyOpen ?
                <CollapseIcon className={classes.subMenuButton} /> :
                <ExpandIcon className={classes.subMenuButton} />
              }
            </ListItem>
            <Collapse in={this.state.difficultyOpen} timeout="auto" unmountOnExit>
              <List disablePadding>
                {this.renderDifficulties()}
              </List>
            </Collapse>
            <ListSubheader className={classes.listHeader}>Settings</ListSubheader>
            <ListItem button onClick={() => this.forceRefresh()}>
              <ListItemIcon>
                <UpdateIcon />
              </ListItemIcon>
              <ListItemText primary="Update App" />
            </ListItem>
          </List>
        </Drawer>
      </React.Fragment>
    );
  }

  private openDrawer(): void {
    this.setState({
      drawerOpen: true
    });
  }

  private closeDrawer(): void {
    this.setState({
      drawerOpen: false,
    });
  }

  private renderDifficulties(): JSX.Element[] {
    return DIFFICUTIES.map(option => (
      <ListItem
        button
        className={this.props.classes.nested}
        key={option.difficulty}
        selected={this.props.difficulty === option.difficulty}
        onClick={() => this.setDifficulty(option.difficulty)}>
        <ListItemIcon>
          {option.icon}
        </ListItemIcon>
        <ListItemText primary={option.label} />
      </ListItem>
    ));
  }

  private setDifficulty(difficulty: DIFFICULTY): void {
    this.closeDrawer();
    this.props.changeDifficulty(difficulty);
  }

  private validate(): void {
    this.closeDrawer();
    this.props.validateSolution();
  }

  private getBarText(): string {
    const difficulty = DIFFICUTIES.find(option => option.difficulty === this.props.difficulty);
    if (difficulty) {
      return `${difficulty.label}`;
    }
    return "";
  }
  private createNewGame(): void {
    this.closeDrawer();
    this.props.createNewGame();
  }

  private reset(): void {
    this.closeDrawer();
    this.props.resetSudoku();
  }

  private fillCandidates(): void {
    this.closeDrawer();
    this.props.fillCandidates();
  }

  private clearCandidates(): void {
    this.closeDrawer();
    this.props.clearCandidates();
  }

  private async forceRefresh() {
    let serviceWorker = await navigator.serviceWorker.getRegistration()
    if (serviceWorker) {
      await serviceWorker.unregister();
    }
    localStorage.clear()
    window.location.reload(true);
  }

  private toggleDifficulty(): void {
    this.setState({ difficultyOpen: !this.state.difficultyOpen })
  }

  private toggleHelp(): void {
    this.setState({ helpOpen: !this.state.helpOpen })
  }
}

export default withStyles(styles)(TopBar);