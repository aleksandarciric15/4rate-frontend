const login = (data: number) => {
  sessionStorage.setItem("accountId", JSON.stringify(data));
};

const logout = () => {
  sessionStorage.removeItem("accountId");
};

const getUserAccountId = () => {
  const accountId = sessionStorage.getItem("accountId");
  return accountId ? JSON.parse(accountId) : null;
};

export { login, getUserAccountId, logout };
