import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg'
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  


  
  <TooltipComponent content={title} position="BottomCenter">
    <button type="button" onClick={customFunc}
    style={{ color }}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span style={{ background:dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      
      
      
      />
        {icon}
      

    </button>

  </TooltipComponent>
)

const Navbar = () => {
  const { activeMenu, setActiveMenu, handleClick, isClicked, setIsClicked, screenSize, setScreenSize, currentColor } = useStateContext();
  
  function handleLogout(){
    fetch('http://localhost:5555/logout', {
        method:"POST",
        credentials: 'include'
    })
    .then(r => r.json())
    .then(data => console.log(data))
    window.location.reload()
  }

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);

  }, []); 

  useEffect(() => {
    if(screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }

  }, [screenSize]);
  return (
    <div className = "flex justify-between p-2 md:mx-6 relative">
      <NavButton title="Menu" customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color={currentColor} icon=
      {<AiOutlineMenu />} />

      <div className="flex">
        {/* <NavButton
          title="Cart"
          customFunc={() => handleClick('cart')}
          color={currentColor}
          icon={<FiShoppingCart />}
        /> */}
        {/* <NavButton
          title="Chat"
          dotColor="#03C9D7"
          customFunc={() => handleClick('chat')}
          color={currentColor}
          icon={<BsChatLeft />}
        /> */}
        <NavButton
          title="LogOut"
          // dotColor="#03C9D7"
          customFunc={() => handleLogout()}
          color={currentColor}
          icon={<FiLogOut />}
        />
        <TooltipComponent
          content="Profile"
          position= "BottomCenter"
        >
          <div className = "flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          onClick={() => handleClick('userProfile')}>
            <span className="rounded-full w-8 h-8 text-3xl" > 
              <CgProfile />

            </span>
              
              
            
            <p>
              <span className="text-gray-400 text-14">Hi, </span> {" "}
              <span className='text-gray-400 font-bold m1-1 text-14'>User</span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14"/>
          

          </div>

        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      

      </div>
      
    </div>
  )
}

export default Navbar