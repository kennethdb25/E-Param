import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    marginTop: 10,
    backgroundColor: '#fff',
  }
}))

export default useStyles;
