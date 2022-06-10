import { Avatar, Button, Dropdown } from "antd";
import { useCallback } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AvatarWrapper, CFSWrapper, ContentWrapper, CSBWrapper, SearchBox } from "../../shared/components/styledComponent";
import Logo from "../Logo/Logo";
import './Header.css'
import MenuItems from "./menu";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsLoggedIn,
  selectAuthUserData,
} from "../../redux/credentialStore/selectors";



const Header = () => {
  // let [, setSearchParams] = useSearchParams('');
  let navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const authUserData = useSelector(selectAuthUserData);

  const handleOnSearch = useCallback((user)=>{
    // setSearchParams({user});
    navigate(`/search?user=${user}`)
  },[navigate]);

  const handleOnLogin = useCallback(()=>{
    navigate(`/login`);
  }, [navigate])


  return (
    <header className="header-style emumba-bg">
      <ContentWrapper>
        <CSBWrapper>
          <Link to="/home">
            <Logo fillColor="#ffffff" />
          </Link>
          <CFSWrapper gap={4}>
            <SearchBox.Search
              placeholder="Search..."
              allowClear
              onSearch={handleOnSearch}
              enterButton={true}
            />
            {!(isLoggedIn && authUserData) ? (
              <Button onClick={handleOnLogin}>Login</Button>
            ) : (
              <Dropdown
                overlay={MenuItems}
                placement="bottom"
                arrow
              >
                <AvatarWrapper>
                  <Avatar
                    src={authUserData?.avatar_url}
                    size={50}
                  />
                </AvatarWrapper>
              </Dropdown>
            )}
          </CFSWrapper>
        </CSBWrapper>
      </ContentWrapper>
    </header>
  );
};

export default Header;
