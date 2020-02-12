//62进制，62位字符串	// private static final String chars =	// "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	private static final String chars = "0123456789abcdefghijklmnopqrstuvwxyz";	
	public static void main(String[] args) {	
			System.out.println(add_36("xx", "oo"));	
		}	
		/**	 * 123+abcd	 * 	 * @param a	 * @param b	 * @return	 */	
		public static String add_36(String a, String b) {	
				int alength = a.length();		int blength = b.length();		int m = Math.max(alength, blength);		int inc = 0;		int clength = chars.length();		String result = "";		for (int i = 0; i < m; i++) {			int ia = i < alength ? chars.indexOf(a.charAt(alength - i - 1)) : 0;			int ib = i < blength ? chars.indexOf(b.charAt(blength - i - 1)) : 0;			int add = ia + ib + inc;			if (add > clength) {				inc = add / clength;			}			result = chars.charAt(add % clength) + result;		}		if (inc > 0) {			result = chars.charAt(inc) + result;		}		return result;	}
