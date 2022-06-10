import { Button, Menu } from "antd"
import { Link } from "react-router-dom";
import { store } from "../../redux/store";
import { logMeOut } from "../../redux/credentialStore/actions";


const ourMenu = (items) => <Menu items={[...items]} />;

const MenuItems = [
    {
      label: (
        <>
          <Link to="/me">
            <h5>Signed in as</h5>
            <h4>{store.getState().logins.token.username}</h4>
          </Link>
        </>
      ),
    },
    {
      label: <hr />,
      disabled: true,
    },
    {
      label: <Link to="/me">Your Gists</Link>,
    },
    {
      label: <Link to="/me">Your Starred Gists</Link>,
    },
    {
      label: <Link to="/me">Help</Link>,
    },
    {
      label: <hr />,
      disabled: true,
    },
    {
      label: <Link to="/me">Your Github Profile</Link>,
    },
    {
      label: <Button onClick={()=>store.dispatch(logMeOut())} type="link">Sign Out</Button>,
    },
  ];

  export default ourMenu(MenuItems);