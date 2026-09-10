const { chromium } = require('playwright');
const assert = require('node:assert');
(async()=>{
  const browser=await chromium.launch({headless:true});
  const results=[];
  for(const viewport of [{name:'手機320',width:320,height:740},{name:'桌面',width:1280,height:900}]){
    const page=await browser.newPage({viewport});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
    await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
    assert.equal(await page.locator('[data-page=home]').isVisible(),true);
    await page.click('[data-go=prompt]');
    await page.fill('#task','建立可執行計畫');
    await page.click('#promptForm .primary');
    assert.match(await page.inputValue('#promptOut'),/建立可執行計畫/);
    await page.click('#backBtn');await page.click('[data-go=tasks]');
    await page.fill('#taskInput','<img src=x onerror=alert(1)> 安全測試');
    await page.click('#taskForm .primary');
    assert.equal(await page.locator('.task-toggle').first().textContent(),'<img src=x onerror=alert(1)> 安全測試');
    assert.equal(await page.locator('.task-item img').count(),0);
    await page.locator('.task-toggle').first().click();
    assert.equal(await page.locator('.task-item.done').count(),1);
    await page.reload({waitUntil:'networkidle'});
    assert.equal(await page.locator('.task-item').count(),1);
    await page.click('#backBtn');await page.click('[data-go=timer]');
    await page.fill('#customMin','0');await page.click('#customTimerForm button');
    assert.match(await page.locator('#toast').textContent(),/1–180/);
    await page.fill('#customMin','1');await page.click('#customTimerForm button');
    assert.equal(await page.locator('#timerText').textContent(),'01:00');
    await page.click('#settingsBtn');await page.selectOption('#themeSelect','light');await page.selectOption('#fontSelect','large');
    assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
    await page.click('[data-action=self-test]');assert.match(await page.locator('#selfTestOut').textContent(),/✅ 必要畫面/);
    assert.deepEqual(errors,[]);
    results.push(`PASS ${viewport.name}`);await page.close();
  }
  const page=await browser.newPage();await page.goto('http://127.0.0.1:4173');
  const sw=await page.evaluate(async()=>!!(await navigator.serviceWorker.ready));assert.equal(sw,true);results.push('PASS PWA Service Worker');
  await browser.close();console.log(results.join('\n'));
})().catch(e=>{console.error(e);process.exit(1)});
