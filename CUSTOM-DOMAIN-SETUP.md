# CredO Website - Custom Domain Setup for cred-o.com

## 🌐 Setting Up Your Custom Domain on Netlify

Since you own `cred-o.com` through Squarespace, you'll need to configure it to work with Netlify hosting.

### Step 1: Deploy to Netlify First
1. Deploy your website to Netlify using Git or drag-and-drop
2. Get your Netlify site URL (e.g., `amazing-site-123456.netlify.app`)
3. Test that everything works on the Netlify subdomain

### Step 2: Add Custom Domain in Netlify
1. Go to your Netlify site dashboard
2. Navigate to **Domain settings**
3. Click **Add custom domain**
4. Enter: `cred-o.com`
5. Netlify will ask you to verify ownership

### Step 3: Configure DNS at Squarespace
Since your domain is registered with Squarespace, you have two options:

#### Option A: Use Netlify DNS (Recommended)
1. In Netlify, go to **Domain settings** → **DNS panel**
2. Note down the Netlify nameservers (usually 4 nameservers)
3. In Squarespace Domain settings:
   - Go to **Advanced Settings** → **Nameservers**
   - Change from Squarespace nameservers to Netlify nameservers
   - This gives Netlify full DNS control

#### Option B: Keep Squarespace DNS
1. In your Squarespace DNS settings, add these records:
   ```
   Type: A
   Host: @
   Value: 75.2.60.5
   
   Type: CNAME
   Host: www
   Value: your-site-name.netlify.app
   ```

### Step 4: Configure SSL Certificate
1. In Netlify **Domain settings**
2. Under **HTTPS**, click **Verify DNS configuration**
3. Once verified, click **Provision certificate**
4. Wait for SSL certificate to be issued (usually 1-24 hours)

### Step 5: Force HTTPS
1. In Netlify **Domain settings**
2. Enable **Force HTTPS redirect**
3. This ensures all traffic is secure

## 🔧 Configuration Files Updated

I've already updated these files for your custom domain:

### Updated Files:
- ✅ `_redirects` - Now redirects to `cred-o.com`
- ✅ `sitemap.xml` - Updated with correct domain
- ✅ `robots.txt` - Updated sitemap location
- ✅ `index.html` - Updated meta tags
- ✅ `reach-out.html` - Updated meta tags

### What These Changes Do:
1. **Redirect all traffic** to your custom domain
2. **Force HTTPS** for security
3. **Redirect www** to non-www version
4. **Update SEO tags** with correct URLs
5. **Update sitemap** for search engines

## 🚨 Important Notes

### Before Going Live:
1. **Test thoroughly** on Netlify subdomain first
2. **Backup your current website** if you have one
3. **Plan for minimal downtime** during DNS changes

### DNS Propagation:
- DNS changes can take **24-48 hours** to fully propagate
- Use tools like [whatsmydns.net](https://whatsmydns.net) to check propagation
- Your site might be temporarily unavailable during transition

### Current Squarespace Site:
- If you have an existing site on cred-o.com, it will be replaced
- Make sure to backup any content you want to keep
- Consider setting up redirects for important pages

## 📋 Deployment Checklist

### Before Domain Setup:
- [ ] Deploy to Netlify successfully
- [ ] Test all forms and functionality
- [ ] Verify all pages load correctly
- [ ] Check mobile responsiveness

### During Domain Setup:
- [ ] Add custom domain in Netlify
- [ ] Configure DNS at Squarespace
- [ ] Wait for DNS propagation
- [ ] Verify SSL certificate
- [ ] Enable Force HTTPS

### After Domain Setup:
- [ ] Test website at cred-o.com
- [ ] Verify forms still work
- [ ] Check all redirects function
- [ ] Test from different locations/devices
- [ ] Submit sitemap to Google Search Console

## 🆘 Troubleshooting

### Common Issues:

**Domain not working:**
- Check DNS propagation
- Verify DNS records are correct
- Wait up to 48 hours for full propagation

**SSL Certificate issues:**
- Ensure DNS is properly configured
- Try re-provisioning certificate in Netlify
- Check that domain verification is complete

**Forms not working:**
- Verify Netlify Forms are enabled
- Check form configuration in HTML
- Test on Netlify subdomain first

**Redirects not working:**
- Check `_redirects` file is deployed
- Verify redirect syntax is correct
- Test individual redirect rules

## 📞 Support Resources

- [Netlify Custom Domains Documentation](https://docs.netlify.com/domains-https/custom-domains/)
- [Netlify DNS Documentation](https://docs.netlify.com/domains-https/netlify-dns/)
- [Squarespace Domain Settings](https://support.squarespace.com/hc/en-us/articles/360002101888)

---

**Status**: ✅ Configuration files updated for cred-o.com
**Next Step**: Deploy to Netlify and configure custom domain
