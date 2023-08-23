const messages = {
  404: 'Page Not Found',
  500: 'Internal Server Error',
};

function CustomErrorPage({ statusCode }) {
  return <h1>{statusCode} - message[statusCode]</h1>;
}

CustomErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomErrorPage;
