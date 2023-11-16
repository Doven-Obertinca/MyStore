import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const linkStyles = {
  color: "inherit",
  typography: "h6",
  "&:hover": {
    color: "grey.A700",
  },
  "&.active": {
    color: "text.secondary",
  },
};

const label = { inputProps: { "aria-label": "Switch demo" } };
interface HeaderProps {
  darkMode: boolean;
  onChange: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onChange }) => {
  return (
    <AppBar position="static" sx={{ mb: 4, backgroundColor: "#2da8a8" }}>
      <Toolbar>
        <Typography component={NavLink} to="/" variant="h6" sx={linkStyles}>
          RE-STORE
        </Typography>
        <Switch onChange={onChange} checked={darkMode} {...label} />
        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => {
            return (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={linkStyles}>
                {title.toLocaleUpperCase()}
              </ListItem>
            );
          })}
        </List>

        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <Badge badgeContent="4" color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>

        <List sx={{ display: "flex" }}>
          {rightLinks.map(({ title, path }) => {
            return (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={linkStyles}>
                {title.toLocaleUpperCase()}
              </ListItem>
            );
          })}
        </List>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
