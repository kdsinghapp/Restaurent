import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    width: '95%',
    padding: 15,
  },
  shadow: {
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageContainer: {
    height: 60,
    width: 60,

    alignItems: 'flex-end',
  },
  nameText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    color: '#000000',
  },
  locationText: {
    color: '#9DB2BF',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '400',
    marginTop: 10,
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    marginTop: 20,
    paddingVertical: 2,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: '#FFF',
  },
  detailsText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  totalPriceText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
    txtHeading:{
fontWeight:'700',
fontSize:24,
lineHeight:36,
color:'#000'
    },
    txtsubHeading:{
        fontWeight:'400',
        fontSize:16,
        lineHeight:24,
        color:'#9DB2BF'
    },
    tabBtn:{
        height:60,

        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 60,
        marginTop: 25,
       
        width: '100%',
      
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,

        elevation: 1,
        backgroundColor: '#352C48',
      },
      
      shadow:{shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      
      elevation: 5,
    }
})