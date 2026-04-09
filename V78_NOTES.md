v78 cleanup patch fixes:
- header/menu shape on mobile
- visible auth navigation
- login/signup page form layout
- button click binding for login/signup/reset
- homepage counters no longer stuck at zero
- override for rogue decorative `.field` styles that were breaking forms

What to test:
1. open index.html
2. check the mobile menu icon looks normal
3. open signup.html and verify inputs are visible
4. create account
5. open login.html and login
6. return to home and check counters
