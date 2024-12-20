type AuthLayoutProps = {
  sectionLayout: string;
  classLayout: string;
  children: React.ReactNode;
};

const AuthLayout = ({
  sectionLayout,
  classLayout,
  children,
}: AuthLayoutProps) => {
  return (
    <section className={sectionLayout}>
      <div className={classLayout}>{children}</div>
    </section>
  );
};

export default AuthLayout;
