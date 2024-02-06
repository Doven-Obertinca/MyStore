import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";

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
  const { basket } = useStoreContext();
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <AppBar position="static" sx={{ mb: 4, backgroundColor: "#2da8a8" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <Typography component={NavLink} to="/" variant="h6" sx={linkStyles}>
            Hana-Interadria
          </Typography>
          <Switch onChange={onChange} checked={darkMode} {...label} />
        </Box>

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
        <Box display="flex" alignItems="center">
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}>
            <Badge badgeContent={itemCount} color="secondary">
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
