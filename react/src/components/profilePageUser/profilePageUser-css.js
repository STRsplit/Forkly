const style = {
  container: {
    marginTop: '56px',
    flexBasis: '100%'
  },
  dashboard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '3%',
    flexWrap: 'wrap',
    alignItems: 'center'
  },

  leftDashboard: {
    display: 'flex',
    // flexDirection: 'column',
    padding: '5px',
    flexShrink: 0.3,
    alignItems: 'center'
  },

  rightDashboard: {
    padding: '5px',
    display: 'flex',
    flexGrow: .8,
    flexDirection: 'row'
  },

  rightDashboardInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1
  },

  statsBar: {
    zDepth: '1',
    width: '100%',
    padding: '2% 5%',
    display: 'flex',
    justifyContent: 'space-around'
  },

  profilePic: {
    zDepth: '1',
    backgroundImage: "url('https://a3-images.myspacecdn.com/images03/1/240e42b5d9ce48a78983961e7fcb3c39/600x600.jpg')",
    borderRadius: '5%',
    width: '150px',
    height: '150px',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  },

  statDetail: {
    zDepth: '0',
    textAlign: 'center',
    padding: '2% 5%',
    textOverflow: 'ellipsis',
    wordWrap: 'wrap',
    // whiteSpace: 'nowrap',
    overflow: 'hidden',
    display: 'block',
    width: '30%'
  }
}

export default style
