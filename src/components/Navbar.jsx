const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Sushi Chat</span>
      <div className="user">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <span>Yannick</span>
        <button>logout</button>
      </div>
    </div>
  );
};

export default Navbar;