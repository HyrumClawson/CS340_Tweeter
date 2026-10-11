interface Props {
  //need to include a function prop
  registerOrLogin: (event: React.KeyboardEvent<HTMLElement>) => void;
  setAlias: (alias: string) => void;
  setPassword: (password: string) => void;
}

const AuthenticationFields = (props: Props) => {
  return (
    <>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          size={50}
          id="aliasInput"
          placeholder="name@example.com"
          onKeyDown={props.registerOrLogin} // this will be different between login and register
          onChange={(event) => props.setAlias(event.target.value)}
        />
        <label htmlFor="aliasInput">Alias</label>
      </div>

      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          placeholder="Password"
          onKeyDown={props.registerOrLogin} // this as well
          onChange={(event) => props.setPassword(event.target.value)}
        />
        <label htmlFor="passwordInput">Password</label>
      </div>
    </>
  );
};

export default AuthenticationFields;
