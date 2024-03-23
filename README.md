# Anodized HTTP components

The HTTP components to the Anodized framework, built for complete modularity. 

### Installation

First, install the HTTP components
```bash
npm i @anodized/http
```

Next, create your entry script, in this example we'll say `src/app.ts` 
```typescript
import { AnodizedApp } from '@anodized/http';

AnodizedApp({
    httpPort: 8080,
    sourceDirectory: 'src/',
    runtimeType: 'node' // this is future-proofing for use in serverless environments such as AWS lambda.
})
```
Now all your TypeScript components will be loaded fron the source directory. Next, create a controller, in lets say `src/controllers/homepage.ts`
```typescript
import { Get, Controller, PreAuthorize } from '@anodized/http'

@Controller()
class Homepage
{
    @Get({ path: '/', produces: 'text/html' })
    showHomepage() {
        return '<h1>Hello World</h1>';
    }
    @Get({ path: '/about.html' })
    showAbout() {
        return '<h1>About me</h1>';
    }
}
```

Now, run your application and head to `http://localhost:8080` to see your result. See the wiki for more in-depth examples.