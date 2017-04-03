const style = {
  container: {
    marginTop: '5%',
    display: 'block'
  },
  dashboard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '3% 10%',
    alignItems: 'center'
  },

  leftDashboard: {
    flexDirection: 'column',
    width: '30%',
    padding: '0 20px'
  },

  rightDashboard: {
    flexDirection: 'column',
    width: '70%',
    padding: '0 20px',
    wrap: 'nowrap',
    float: 'right'
  },
  statsBar: {
    zDepth: '1',
    width: '100%',
    margin: 20,
    display: 'table',
    padding: '2% 5%',
    borderSpacing: '10px',
    tableLayout: 'fixed',
    
  },

  profilePic: {
    zDepth: '1',
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block'
  },

  statDetail: {
    zDepth: '0',
    textAlign: 'center',
    display: 'table-cell',
        // justifyContent: 'space-around',
    padding: '2% 5%',
    wordWrap: 'break-word'
  }
}

export default style
