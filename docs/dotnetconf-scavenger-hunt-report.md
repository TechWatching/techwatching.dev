# .NET Conf 2025 Secret Decoder Challenge Report

**Date:** 2025-11-12  
**Challenge URL:** https://www.dotnetconf.net/challenges  
**Status:** Incomplete - External Sites Blocked

---

## Executive Summary

I attempted to solve the .NET Conf 2025 Secret Decoder Challenge, which is a scavenger hunt where participants must visit 13 sponsor pages to collect letters/characters and unscramble them into a secret message. Unfortunately, **all external sponsor websites are blocked** in this environment, preventing me from collecting the actual clues.

---

## Challenge Details

### Overview
- **Challenge Name:** Secret Decoder Challenge
- **Description:** The dotnet-bot has a special message hidden across sponsor pages
- **Prize:** 1 of 13 prizes from sponsors (total value over $5,500 per prize)
- **Duration:** Open until 4PM PST on Thursday, November 13, 2025
- **Secret Phrase Length:** 13 characters (letters, numbers, or special characters)

### How It Works
1. Visit each of the 13 sponsor pages listed on the challenge page
2. Find a clue (letter or special character) on each page
3. Collect all 13 clues
4. Unscramble them into the secret message
5. Submit the answer via the form on the challenges page
6. Winners are randomly drawn from correct submissions

### Prize Format
The hint shows the answer structure:
```
_ _ _ _ _ _  _ _ _ _ _ _ _
```
(13 characters total, appears to have a space after the 6th character)

---

## Sponsor Pages to Visit

I identified all 13 sponsor pages that need to be visited for clues:

### 1. Bunifu Framework
- **URL:** https://bunifuframework.com/secret-decoder-challenge/
- **Status:** ❌ Blocked (Could not resolve host)
- **Clue Found:** N/A

### 2. CODE Magazine
- **URL:** https://www.codemag.com/DotNetSecret25
- **Status:** ❌ Blocked (Could not resolve host)
- **Clue Found:** N/A

### 3. DevExpress
- **URL:** https://www.devexpress.com/aboutus/events/netconf2025/
- **Status:** ❌ Blocked (Could not resolve host)
- **Clue Found:** N/A

### 4. Dometrain
- **URL:** https://dometrain.com/dotnet-conf/
- **Status:** ❌ Blocked (Could not resolve host)
- **Clue Found:** N/A

### 5. dotConnect (Devart)
- **URL:** https://www.devart.com/dotnetconf/
- **Status:** ❌ Blocked (Could not resolve host)
- **Clue Found:** N/A

### 6. GAP
- **URL:** https://www.gapvelocity.ai/net-conf-challenge
- **Status:** ❌ Blocked (Could not resolve host)
- **Clue Found:** N/A

### 7. Gnostice
- **URL:** https://www.gnostice.com/dotnetconf.asp
- **Status:** ❌ Blocked (Could not resolve host)
- **Clue Found:** N/A

### 8. Infragistics
- **URL:** https://www.infragistics.com/secret-decoder-challenge
- **Status:** ❌ Blocked (Could not resolve host)
- **Clue Found:** N/A

### 9. Iron Software
- **URL:** https://ironsoftware.com/events/net-conf-2025/
- **Status:** ❌ Blocked (Could not resolve host)
- **Clue Found:** N/A

### 10. Mescius
- **URL:** https://developer.mescius.com/ms-netconf
- **Status:** ❌ Blocked (Could not resolve host)
- **Clue Found:** N/A

### 11. Packt
- **URL:** https://www.amazon.com/stores/page/D2749030-64B9-4167-A422-9384D0151B36
- **Status:** ❌ Blocked (Could not resolve host)
- **Clue Found:** N/A

### 12. Progress (Telerik)
- **URL:** https://www.telerik.com/secret-decoder-challenge/
- **Status:** ❌ Blocked (Could not resolve host)
- **Clue Found:** N/A

### 13. Uno Platform
- **URL:** https://platform.uno/dotnetconf
- **Status:** ❌ Blocked (Could not resolve host)
- **Clue Found:** N/A

---

## Technical Limitations

### Environment Restrictions
This sandboxed environment has **limited internet access** with many domains blocked for security purposes. The error message received when attempting to access each sponsor site was:

```
curl: (6) Could not resolve host: [domain]
```

### What Was Accessible
- ✅ **https://www.dotnetconf.net/** - Main conference site (accessible)
- ✅ **https://www.dotnetconf.net/challenges** - Challenge page (accessible)
- ❌ All 13 external sponsor websites (blocked)

---

## Challenge Page Structure

### Main Sections Discovered

#### 1. Challenge Introduction
- Located at: `/challenges`
- Title: "Secret Decoder Challenge"
- Tagline: "Play the Secret Decoder Challenge"
- Description: Explains the challenge mechanics

#### 2. Instructions
Clear step-by-step instructions:
1. Visit each sponsor page
2. Find the clue (letter or special character)
3. Collect all clues
4. Unscramble them
5. Submit via form

#### 3. Timing & Rules
- Opens: During .NET Conf (November 11-13, 2025)
- Closes: 4PM PST, Thursday, November 13, 2025
- Answer reveal: ~5PM PST, November 13, 2025
- Winners notified via email

#### 4. Hint Section
Shows the answer structure:
- 13 characters total
- Pattern: `_ _ _ _ _ _  _ _ _ _ _ _ _`
- Appears to have a space between 6th and 7th characters

#### 5. Submission Form
- HubSpot form embedded
- Form ID: `d17768c1-7ca0-449a-bec8-2dc7cf2bddd6`
- Portal ID: `216184`
- Region: `na1`

#### 6. Prizes Section
Lists all 13 prizes from sponsors:
1. **Bunifu Framework**: Ultimate Bundle License ($349) + $250 Amazon card
2. **CODE Magazine**: Training Class Voucher ($1,200 value)
3. **DevExpress**: $500 Amazon gift card
4. **Dometrain**: Annual Pro subscription ($600 value)
5. **dotConnect**: $500 Amazon gift card
6. **GAP**: $500 Amazon gift card
7. **Gnostice**: Document Studio .NET Ultimate License
8. **Infragistics**: $250 Amazon Card + 1 year App Builder
9. **Iron Software**: $1,000 voucher + $200 merch store
10. **Mescius**: "A very cool prize"
11. **Packt**: $50 book + $200 annual subscription + $250 Amazon
12. **Progress**: $500 Amazon gift card
13. **Uno Platform**: Studio Annual License ($390) + $200 Amazon GC

---

## What You Need to Do

Since I cannot access the external sponsor sites due to network restrictions, you'll need to:

### Manual Steps Required

1. **Visit Each Sponsor Page** (in order or any order):
   - Open each of the 13 URLs listed above in your web browser
   - Look carefully for hidden clues on each page

2. **Finding Clues - Where to Look**:
   - Hidden text (small, off-screen, or same-color-as-background)
   - Special sections labeled "clue", "secret", "decoder", or similar
   - Images with text overlays
   - Source code comments (View Page Source)
   - Alt text on images
   - Hidden divs or elements (inspect with browser DevTools)
   - Footer or header areas
   - Popup messages or modals
   - Easter eggs in navigation or buttons

3. **Document Your Findings**:
   Create a tracking sheet like this:
   ```
   Sponsor              | Clue Found | Notes
   ---------------------|------------|------------------
   Bunifu Framework     | ?          |
   CODE Magazine        | ?          |
   DevExpress           | ?          |
   Dometrain            | ?          |
   dotConnect           | ?          |
   GAP                  | ?          |
   Gnostice             | ?          |
   Infragistics         | ?          |
   Iron Software        | ?          |
   Mescius              | ?          |
   Packt                | ?          |
   Progress             | ?          |
   Uno Platform         | ?          |
   ```

4. **Unscramble the Message**:
   - Once you have all 13 characters
   - Look at the pattern: `_ _ _ _ _ _  _ _ _ _ _ _ _` (6 + 7)
   - Try different combinations
   - Consider .NET-related phrases
   - Possible themes: C# keywords, .NET concepts, conference themes

5. **Submit Your Answer**:
   - Return to https://www.dotnetconf.net/challenges
   - Fill out the submission form at the bottom
   - Enter your contact information
   - Submit the secret phrase
   - Note: You'll be contacted by sponsors if you win

---

## Possible Answer Hints

Based on the .NET Conf theme and 13-character format, the secret phrase might be related to:

### .NET-Related Phrases (13 chars):
- Technical terms related to .NET 10
- C# language features
- Conference themes
- Developer concepts
- Framework names

### Common Patterns:
- Two words (6 + 7 characters)
- Could include special characters
- Might be a phrase like "HELLO DOTNET!" or similar

---

## Tips for Finding Hidden Clues

### Browser Techniques:
1. **View Page Source**: Right-click → "View Page Source" or press `Ctrl+U` / `Cmd+Option+U`
2. **Inspect Element**: Right-click → "Inspect" or press `F12`
3. **Search Page**: Press `Ctrl+F` / `Cmd+F` and search for "clue", "secret", "decoder", "letter"
4. **Check CSS**: Look for elements with `display: none` or `opacity: 0`
5. **Scroll Everywhere**: Some clues might be off-screen
6. **Check Images**: Right-click images and check alt text
7. **Console**: Open browser console (`F12`) for any JavaScript messages

### Common Hiding Places:
- HTML comments: `<!-- Clue: X -->`
- Meta tags in `<head>`
- Hidden divs with CSS
- Invisible text (white text on white background)
- Base64 encoded strings
- URL parameters
- Cookie values
- Local storage

---

## Recommendations

1. **Visit Pages Methodically**: Go through each sponsor page one at a time
2. **Take Screenshots**: Capture anything suspicious
3. **Use Browser DevTools**: Essential for finding hidden content
4. **Check Multiple Browsers**: Some clues might render differently
5. **Mobile View**: Check responsive/mobile versions too
6. **Read Everything**: Don't skip any text on the pages
7. **Try Different Times**: Some pages might have time-based clues

---

## Follow-Up Actions

Once you collect the clues manually:

1. ✅ Document all 13 clues
2. ✅ Attempt to unscramble them
3. ✅ Verify the answer matches the 13-character pattern
4. ✅ Submit via the form before the deadline (Nov 13, 4PM PST)
5. ✅ Check your email for winner notification

---

## Conclusion

This scavenger hunt challenge is well-designed and offers significant prizes, but requires manual participation by visiting each external sponsor website. Due to network restrictions in this automated environment, **human intervention is required** to complete the challenge.

**Next Steps:**
- Manually visit all 13 sponsor pages
- Collect the letter/character clues
- Unscramble the secret message
- Submit before the November 13 deadline

Good luck with the challenge! 🎯

---

## Additional Resources

- **Main Site**: https://www.dotnetconf.net/
- **Challenge Page**: https://www.dotnetconf.net/challenges
- **Rules**: https://www.dotnetconf.net/rules#challenge
- **Conference Dates**: November 11-13, 2025
- **Challenge Deadline**: November 13, 2025, 4PM PST
- **Answer Reveal**: November 13, 2025, ~5PM PST

---

**Report Generated**: 2025-11-12  
**Environment**: Sandboxed GitHub Actions  
**Status**: Investigation Complete - Manual Follow-up Required
