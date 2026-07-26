---
title: "Back-End Driven Component Facade in Angular"
description: "Imagine you have a large-scale application and a part of it should render a variety of different components. All the components, their ordering, and their supplied data is coming from the back-end. What the client-side of the app decides, is to just use the schema it is being provided with to dynamically render components."
author: "Pridon Tetradze"
image: "https://angular.dev/assets/images/ng-image.jpg"
date: 2024-09-28
templateEngineOverride: md
tags:
  - post
  - tech
---

## The Scenario

Imagine you have a large-scale application and a part of it should render a variety of different components.
All the components, their ordering, and their supplied data is coming from the back-end.
What the client-side of the app decides, is to just use the schema it is being provided with to dynamically render components.
This pattern is sometimes referred to as the facade pattern.

Here's the [full code example](https://github.com/CondensedMilk7/ng-facade) in advance,
as well as the [live stackblitz example](https://stackblitz.com/~/github.com/CondensedMilk7/ng-facade?file=src/app/app.component.ts).
Mind you, this example is here just to give you an idea/inspiration.
I wouldn't go around using the exact copy of this code.

## The Poor Way

Now, if you just want to get things done quick and dirty, you'd do something like list out all the possible components in the template
and just conditionally render them with the data you have been provided with from the back-end.

Suppose this is the data you get from some `ComponentsService.getComponents()` method:

```json components.json
{
  "components": [
    {
      "id": "WeatherComponent",
      "componentData": {
        "temperature": 16,
        "humidity": 40
      }
    },
    {
      "id": "NewsComponent",
      "componentData": {
        "mostRecent": "Some things just happened!"
      }
    }
  ]
}
```

In the parent component you would do something like this:

```ts app.component.ts
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: `
    @if (weatherComponentData) {
      <app-weather />
    }
    @if (newsComponentData) {
      <app-news />
    }
    @if (feedComponentData) {
      <app-feed />
    }
  `,
})
export class AppComponent implements OnInit {
  private readonly componentsService = inject(ComponentsService);

  newsComponentData!: { mostRecent: string };
  weatherComponentData!: { temperature: number, humidity: number };
  feedComponentData!: { posts: Post[] };

  ngOnInit(): void {
    this.componentsService
      .getComponents()
      .subscribe(() => {/* set component data here */});
  }
}
```

I didn't add data binding to the components for the sake of brevity, but you get the idea.
You simply fetch the component data, check if the particular data for each component exists and only then do you render them.
Notice that we cannot manage the ordering like this. Besides that, all the client side component code will be part of the
initial bundle that the client loads, even if the back-end doesn't contain the data for the particular component.
The `app-feed` component bundle, for example, will still be loaded, even though we don't get it from the server.

You could add lazy-loading with the [`@defer` block](https://angular.dev/guide/defer) but that still doesn't help us with the ordering!
What if the server decided the news component should come before the weather component?

## The Dynamic Way

Let's employ something more _dynamic_. The plan is to create an injection token for every dynamically loadable component we have.
These tokens will return components that are only imported when we inject these tokens.
Then we are going to use the `ViewContainerRef` to render these components in the correct order
and set their input data to whatever we have supplied from the server.

This is what our project looks like:

```
src
├── app
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── components
│       ├── component-response.ts
│       ├── components.service.ts
│       ├── component-tokens.ts
│       ├── feed
│       │   └── feed.component.ts
│       ├── news
│       │   └── news.component.ts
│       └── weather
│           └── weather.component.ts
├── index.html
├── main.ts
└── styles.css
```

We have pre-defined components in the `components` directory, alongside some additional type and injection token definition files.
There's also the service file which manages fetching the data from the server.
In our case, we simply have `components.json` file in the `public` folder which is served by the Angular server.

Let's look at the type definitions first. This is what `component-response.ts` looks like:

```ts component-response.ts
import { InjectionToken } from '@angular/core';

// It's a generic just to show that it can be turned into something more elaborate
export interface ComponentResponse<ComponentId, ComponentData extends object> {
  id: ComponentId;
  componentData: ComponentData;
}

export type ComponentsResponse = ComponentResponse<string, object>[];

export type Constructor<T = any> = new (...args: any[]) => T;
export type ComponentClass<T = any> = InstanceType<Constructor<T>>;

export interface FacadeComponent {
  token: InjectionToken<Promise<ComponentClass>>;
  data: object;
}
```

The `ComponentsResponse` simply describes the array of objects we are going to receive from the server.
The interesting part here is the `FacadeComponent` interface, which describes the mapped object we are going to create after fetching the data.
There we will derive injection token names (as strings) from the `id` properties of the `ComponentResponse`.
The token will return a promise that resolves into a component class.
We also defined the `data` property which will be set on the component inputs.

Let's take a look at our components:

```ts feed.component.ts
import { Component, Input } from '@angular/core';

export interface Post {
  title: string;
  body: string;
}

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [],
  template: `
    <hr />
    <p>Feed:</p>
    <ul>
      @for (post of posts; track post.title) {
        <li>
          <b>{{ post.title }}:</b> {{ post.body }}
        </li>
      }
    </ul>
  `,
})
export class FeedComponent {
  @Input() posts: Post[] = [];
}
```

```ts news.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [],
  template: `
    <hr />
    <p>News:</p>
    <p>{{ mostRecent }}</p>
  `,
})
export class NewsComponent {
  @Input() mostRecent = 'Nothing!';
}
```

```ts weather.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  template: `
    <hr />
    <p>Weather:</p>
    <p>Temperature: {{ temperature }}</p>
    <p>Humidity: {{ humidity }}</p>
  `,
})
export class WeatherComponent {
  @Input() temperature = 0;
  @Input() humidity = 0;
}
```

All these component class definitions are then used in the `component-tokens.ts` to create injection tokens.

```ts component-tokens.ts
import { InjectionToken } from '@angular/core';

export const WEATHER_COMPONENT = new InjectionToken('WeatherComponent', {
  providedIn: 'root',
  factory: () =>
    import('./weather/weather.component').then((m) => m.WeatherComponent),
});

export const NEWS_COMPONENT = new InjectionToken('NewsComponent', {
  providedIn: 'root',
  factory: () => import('./news/news.component').then((m) => m.NewsComponent),
});

export const FEED_COMPONENT = new InjectionToken('FeedComponent', {
  providedIn: 'root',
  factory: () => import('./feed/feed.component').then((m) => m.FeedComponent),
});

export const COMPONENT_TOKENS = [
  WEATHER_COMPONENT,
  NEWS_COMPONENT,
  FEED_COMPONENT,
];
```
The first parameter of the `InjectionToken` determines the name of the token,
while the `factory` method determines how the returned value is created.
Here we have a function that returns a call to an `import` function.
The `import` function in typescript is very useful and you probably have seen in in the angular router.
The compiler creates a lazy chunk from the path that it has received.
The chunk will only be loaded and evaluated when the factory method is invoked and that happens when we inject this token for the first time.
Simply put, these tokens say that they return lazily loaded components.

All the available tokens are then listed out in the `COMPONENT_TOKENS` array, so that the we can know what tokens are available.

Let's take a look at the `components.service.ts` where we use this list of tokens.

```ts components.service.ts
/* ... */
import { COMPONENT_TOKENS } from './component-tokens';
import { ComponentsResponse, FacadeComponent } from './component-response';

@Injectable({ providedIn: 'root' })
export class ComponentsService {
  private readonly http = inject(HttpClient);
  private tokens = COMPONENT_TOKENS;

  getComponents(): Observable<FacadeComponent[]> {
    return this.http
      .get<{ components: ComponentsResponse }>('/components.json')
      .pipe(
        map((response) =>
          response.components
            .map((comp) => ({
              token: this.tokens.find(
                (token) => token.toString().split(' ')[1] === comp.id,
              ),
              data: comp.componentData,
            }))
            .filter((comp) => comp.token),
        ),
      );
  }
}
```

Here we fetch the list of components and return a list of different objects.
For each object in the response, we check if the token exists,
that corresponds to the `id` field of the response object.
The `InjectionToken.toString()` actually gives us a value like `'InjectionToken NewsComponent'` and we are only interested in the second half of it.
In the end, we have a list of objects with the component tokens and their corresponding data.
If we cannot find a suitable token for the given component id, we filter it out so that the app doesn't break because we need to render an unknown component.

Finally, we take this service and use it to render the components in the main component (in this case, `AppComponent`):

```ts app.component.ts
/* ... */
import { ComponentsService } from './components/components.service';
import { ComponentClass, FacadeComponent } from './components/component-response';

@Component({
  selector: 'app-root',
  standalone: true,
  template: ``,
})
export class AppComponent implements OnInit {
  private readonly vcr = inject(ViewContainerRef);
  private readonly injector = inject(Injector);
  private readonly componentsService = inject(ComponentsService);

  ngOnInit(): void {
    this.componentsService
      .getComponents()
      .subscribe((components) => this.renderComponents(components));
  }

  renderComponents(components: FacadeComponent[]) {
    components.forEach(({ token, data }) => {
      this.injector.get(token)?.then((componentClass: ComponentClass) => {
        const component = this.vcr.createComponent(componentClass);

        Object.entries(data).forEach(([key, value]) => {
          component.setInput(key, value);
        });
      });
    });
  }
}
```

The `renderComponents` method loops over every component object and uses their `token` property
to inject the data it provides with the `Injector.get()` method.
Remember, that (as we defined it in the tokens) this gives us a `Promise`.
We use `Promise.then()` to get a hold of the component that has been lazily loaded
and use the `ViewContainerRef` to render it in the host's view.
Finally, we loop over every key that the component data object has,
which are the expected input properties of those components, thus setting them to the necessary values.

And just like that, our components are rendered in exactly the same order as we have it in our server response.
If you check the network tab in the browser, you should see that these components are rendered in the separate chunks.
If you remove any single component object from the `components.json` file, you will see that they are not loaded at all!

We could make this work without the injection tokens by creating a simple configuration object too.
The useful thing about injection tokens is that we can override them in different scenarios
(such as unit testing, providing a new redesigned component instead of an old one, etc.).

Again, you can check the [source code](https://github.com/CondensedMilk7/ng-facade),
or the [stackblitz example](https://stackblitz.com/~/github.com/CondensedMilk7/ng-facade?file=src/app/app.component.ts) to play around with it in your browser.

Have fun!

