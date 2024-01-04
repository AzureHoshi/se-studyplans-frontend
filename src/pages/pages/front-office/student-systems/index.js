function reDirectoDashBoard() {}
export async function getServerSideProps() {
  return {
    redirect: {
      destination: 'dashboard',
      permanent: false // Set to true for permanent redirection
    }
  }
}

export default reDirectoDashBoard
