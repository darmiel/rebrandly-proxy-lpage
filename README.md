# Why?
I've been using Rebrandly a little longer now to create short URLs.  
But it has always bothered me that I can't set a landing page myself (in the free version).  
So I created a little workaround for this:

---

The main short domain (in this case `main.domain`) redirects to a node server (`src/`).  
The domain `short.main.domain` is the domain setup in rebrandly.  


If no path is given, you will be redirected to the landing page.  
If you specify a path, you will be redirected to `short.main.domain/{path}` and rebrandly will send you to the correct URL.