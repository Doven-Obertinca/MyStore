import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

const label = { inputProps: { "aria-label": "Switch demo" } };
interface HeaderProps {
  darkMode: boolean;
  onChange: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onChange }) => {
  return (
    <AppBar position="static" sx={{ mb: 4, backgroundColor: "#2da8a8" }}>
      <Toolbar>
        <Switch onChange={onChange} checked={darkMode} {...label} />
        <Typography variant="h6">RE-STORE</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
