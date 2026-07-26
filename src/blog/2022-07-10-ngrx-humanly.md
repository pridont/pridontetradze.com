---
title: NgRx ადამიანურად
date: 2022-07-10
image: https://i.imgur.com/jxyBTN1.png
imageAlt: Image of Angular and NgRx logo
language: geo
description: თუ ანგულარ დეველოპერის ვაკანსიები დაგითვალიერებიათ, ალბათ გინახავთ აღწერა, სადაც NgRx-ის ცოდნა დიდ პლიუსად ითვლება. მიუხედავად ამისა, ბევრი დამწყები დეველოპერი ან გაურბის NgRx-ს, ან მისი სწავლა უბრალოდ არასაჭიროდ მიაჩნია. ამის ბრალი სავარაუდოდ NgRx-ის ერთი შეხედვით რთული, ძალზედ ჩახლართული სტრუქტურაა. სინამდვილეში NgRx არის ძალიან მძლავრი ხელსაწყო, რომელიც ანგულარით დეველოპმენტს ძალზედ ამარტივებს, განსაკუთრებით დიდ აპლიკაციებზე გუნდური მუშაობის დროს.
tags:
  - post
  - tech
---

> ვიდეოს სანახავად [გადადით ამ ბმულზე](https://youtu.be/_kH0PG0Pf-4)

## შესავალი

თუ ანგულარ დეველოპერის ვაკანსიები დაგითვალიერებიათ, ალბათ გინახავთ აღწერა, სადაც NgRx-ის ცოდნა დიდ პლიუსად ითვლება.
მიუხედავად ამისა, ბევრი დამწყები დეველოპერი ან გაურბის NgRx-ს, ან მისი სწავლა უბრალოდ არასაჭიროდ მიაჩნია. ამის ბრალი სავარაუდოდ NgRx-ის ერთი შეხედვით რთული, ძალზედ ჩახლართული სტრუქტურაა.
სინამდვილეში NgRx არის ძალიან მძლავრი ხელსაწყო, რომელიც ანგულარით დეველოპმენტს ძალზედ ამარტივებს, განსაკუთრებით დიდ აპლიკაციებზე
გუნდური მუშაობის დროს.

რეკომენდირებულია, რომ იცოდეთ Angular-ისა და RxJs-ის საფუძვლები, სანამ NgRx-ს გაეცნობით.

## რა არის NgRx?

NgRx არის ბიბლიოთეკა, რომელიც გვეხმარება აპლიკაციის სთეითის (State) მენეჯმენტში. თუ წარმოვიდგენთ, რომ
ჩვენი აპლიკაცია არის მანქანა, მაშინ სთეითი არის ყველაფერი, რისი მდგომარეობაც შეიძლება მანქანაში შეიცვალოს.
მაგალითად, საჭის, პოზიცია, მგზავრების რაოდენობა, სიჩქარე, პედლები, სარკის პოზიცია და ა.შ.
NgRx-ით სისტემურად და ორგანიზებულად შეგვიძლია განვსაზღვროთ, რა უნდა გააკეთოს მანქანამ, როცა მძღოლი მანქანას დაქოქავს,
სიჩქარეს გადართავს ან საჭეს დაატრიალებს.

### საკვანძო ცნებები

- **Action** - ექშენი არის უნიკალური მოვლენა რომელიც გაიცემა კომპონენტებისა და სერვისებისგან (მაგალითად სიაში ნივთის დამატება, წაშლა, ფაილის ატვირთვა და სხვა).
- **Reducer** - სთეითის ცვლილებას უზრუნველყოფს წმინდა ფუნქციების ერთობლიობა, რომელსაც რედიუსერი ეწოდება. ისინი იღებენ მიმდინარე სთეითს და უახლეს ექშენს, რათა გამოთვალონ ახალი სთეითი.
- **Selectors** - წმინდა ფუნქციები, რომლებიც გამოიყენება სთეითის ნაწილების ასაღებად ან შესადგენად.
- **Store** - სთეითი ხელმისაწვდომია Store-ის საშუალებით, რომელიც სთეითის დაკვირვებადი ინსტანციაა და ამასთანავე ის თავად აკვირდება ექშენებს.
- **Effects** - ეფექტები არის ერთგვარი გვერდითი მოვლენები, რომლებიც ექშენების პარალელურად ხორციელდება. ისინი ერთი მხრივ, უსმენენ ექშენებს, რათა API-ს დაუკავშირდნენ და სათანადო ოპერაციები ჩაატარონ აპლიკაციის მიღმა, ხოლო მეორე მხრივ, თავად გასცემენ ექშენებს, როცა, მაგალითად წარმატებით მოიპოვეს მონაცემები, რომლებიც უნდა აპლიკაციის სთეითში განათავსონ.

ამ ყველაფრის საილუსტრაციოდ NgRx-ის დოკუმენტაცია გვთავაზობს შესანიშნავ სქემას:

![](https://ngrx.io/generated/images/guide/store/state-management-lifecycle.png)

ამოსავალ წერტილად კომპონენტი ავიღოთ მარცხენა ქვედა კუთხიდან. როგორც ვხედავთ, კომპონენტი სელექტორისგან იღებს სთეითის შესახებ ინფორმაციას, მაგალითად გასაკეთებელი საქმეების სიას. თავის მხრივ კომპონენტი გასცემს ექშენებს, სადაც ინახება ინფორმაცია, რომელიც ახალ სთეითზე უნდა აისახოს, მაგალითად ახალი გასაკეთებელის საქმე. ექშენები უკავშირდება რედიუსერებსა და ეფექტებს. თუ აპლიკაცია მოცემული ექშენით არ უნდა დაუკავშირდეს API-ს, მაშინ ის პირდაპირ რედიუსერში გაივლის, მაგრამ თუ სერვერთან დაკავშირება გვჭირდება - ვთქვათ ახალი გასაკეთებელი საქმე მონაცემთა ბაზაში უნდა ავსახოთ - მაშინ ექშენი (რედიუსერთან ერთად) ეფექტებსაც გაივლის. თუმცა, უფრო სწორი იქნება იმის თქმა, რომ ამ ექშენს ეფექტები დააფიქსირებს. მონაცემთა ბაზასთან კომუნიკაციის პარალელურად ჩვენ გვინდა მომხმარებელს ვაჩვენოთ, რომ ახალი ნივთი მალე ჩაიტვირთება, ასერომ ექშენმა ეფექტთან ერთად რედიუსერიც უნდა გაიაროს, რათა მოლოდინის მდგომარეობა ასახოს სთეითში, მაგალითად ჩატვირთვის სპინერი. ექშენენები და ეფექტები ერთმანეთთან ორმხრივად დაკავშირებულია. ეს იმიტომ ხდება, რომ ეფექტები, როცა ისინი ექშენს მიიღებენ, სერვისს იყენებენ, რათა დაუკავშირდნენ API-ს და მისგან მიიღონ პასუხი, წარმატებით დაემატა თუ არა ახალი ნივთი. როცა პასუხს მიიღებენ, ისინი თავად გასცემენ ექშენს, მაგალითად ექშენს, რომელიც გვეუბნება, რომ ახალი ნივთი წარმატებით დაემატა მონაცემთა ბაზაში. ეს ექშენიც გაივლის რედიუსერს, რომელიც ახალ დამატებულ ნივთს მომხმარებლის სიაში ასახავს, ხოლო ჩატვირთვის სპინერს - რომელიც პირველი ექშენით გავაჩინეთ სთეითში - გააქრობს. ამ ყველაფრის თავში არის სთორი, რომელიც უკანა ფონზე რედიუსერების მიერ გადამუშავებულ მონაცემებს ასახავს სთეითში და ამ სთეითის შესახებ ინფორმაციას გვაწვდის სელექტორის საშუალებით. ამ უკანასკნელს იყენებს კომპონენტი, რომელიც სთეითს ასახავს აპლიკაციაში. ასე შეიკრა ჩვენი სთეითის მენეჯმენტის ციკლი. პრაქტიკაში ეს ყველაფერი უფრო ნათელი გახდება.

## ჩვენი აპლიკაცია

რათა აპლიკაციის აგებაზე ზედმეტი დრო არ დავხარჯოთ, გამოვიყენებთ წინასწარ აგებულ პროექტს, რომლის კოდიც შეგიძლიათ ჩამოწეროთ [გითჰაბის რეპოზიტორიიდან](https://github.com/CondensedMilk7/ng-lesson-todo/tree/ngrx-starter) (ngrx-starter branch). არ დაგავიწყდეთ `npm install` ბრძანების გაშვება. აპლიკაცია ბექენდად ლოკალურ ფაილს იყენებს - database/db.json. ამ უკანასკნელის სერვერით გააქტიურება შეგიძლიათ ბრძანებით `json-server --watch database/db.json`. json-server შეგვიქმნის ლოკალურ სერვერს მონაცემთა ბაზით, რომელთანაც აპლიკაცია HTTP მოთხოვნებს გზავნის. ამის შემდეგ მეორე ტერმინალის ინსტანციაში გაუშვით `ng serve`.

აპლიკაციის სტრუქტურა:

```txt
src/app
├── app.component.css
├── app.component.html
├── app.component.ts          # მთავარი კომპონენტი. ყველა სხვა კომპონენტი
├── app.module.ts                 # მასშია განთავსებული.
├── input                     # ახალი გასაკეთებლი საქმის დასამატებელი ველი.
│   ├── input.component.css       # უშუალოდ იყენებს ItemsService-ს.
│   ├── input.component.html
│   └── input.component.ts
├── item                      # გასაკეთებელი საქმის კომპონენტი, შეიცავს
│   ├── item.component.css        # წაშლის ღილაკს და გადახაზვის ფუნქციას.
│   ├── item.component.html       # უშუალოდ იყენებს ItemsService-ს.
│   └── item.component.ts
├── item.model.ts             # გასაკეთებელის საქმის მოდელი
└── items.service.ts          # სერვისი, რომელიც უკავშიდება API-ს
```

არ იჩქაროთ, დაათვალიერეთ აპლიკაცია და ნახეთ როგორ მუშაობს მისი თითოეული კომპონენტი.

აპლიკაციაში ბევრი არასასურველი პატერნია. მაგალითად, სერვისებს თითოეული პატარა კომპონენტი უშუალოდ იყენებს. `subscribe` მეთოდი ბევრჯერაა გამოყენებული ts ფაილებში. ამასთანავე, სერვისში ვეყრდნობით საბჯექთებს, რომელიც ყოველ HTTP მოთხოვნაზე უნდა დავაემითოთ განახლებული ნივთების სიით, რომელსაც AppComponent უსმენს. NgRx დაგვეხმარება, რომ დეველოპმენტის საუკეთესო პატერნები გამოვიყენოთ, რათა მაქსიმალურად ავარიდოთ თავი მოუწესრიგებელ და გაუგებარ კოდს.

## პირველი ნაბიჯები

დავაინსტალიროთ NgRx. ჩვენ დაგვჭირდება მთავარი მოდული, `ngrx/store` და ეფექტების მოდული `ngrx/effects`. ამასთანავე `ngrx/store-devtools`-ს გამოვიყენებთ დეველოპმენტის დროს, რათა ბრაუზერიდან დავაკვირდეთ სთეითს. ამისათვის ქრომზე დაგჭირდებათ [Redux ექსთენშენის](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) დაყენება.

```
npm install @ngrx/effects @ngrx/store @ngrx/store-devtools
```

დავარეგისტრიროთ ისინი მოდულში:

```ts app.module.ts
// ... other imports
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

@NgModule({
  declarations: [AppComponent, ItemComponent, InputComponent],
  imports: [
    // ... other imports
    StoreModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production,
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

სთორის ყველა კომპონენტისთვის ჩვენ ცალკეული ფოლდერი გვექნება, რომლებიც store-ის ფოლდერში მოიყრიან თავს.

```
src/app/store
├── actions
├── effects
├── reducers
├── selectors
├── state
└── util
```

ახლა მთავარი კითხვაა საიდან დავიწყოთ. მახსოვს ჩემმა მენტორმა ერთი შესანიშნავი რჩევა მომცა NgRx-ს როცა ვითვისებდი: "თუ არ იცი რითი დაიწყო, ექშენებით დაიწყე".

ექშენების ფოლდერში შევქმნათ todo.actions.ts. ახლა დავფიქრდეთ იმაზე, თუ რა მოქმედებები შეიძლება განახორციელოს მომხმარებელმა. მომხმარებელს უნდა შეეძლოს ნივთების ნახვა, ახალი ნივთის დამატება, მისი წაშლა ან შეცვლა.

```ts store/actions/todo.actions.ts
import { createAction, props } from "@ngrx/store";
import { Item } from "src/app/item.model";

export const addItem = createAction(
  "[Todo Page] Add Item",
  props<{ description: string }>()
);

export const deleteItem = createAction(
  "[Todo Page] Delete Item",
  props<{ id: number }>()
);

export const updateItem = createAction(
  "[Todo Page] Update Item",
  props<{ item: Item }>()
);

export const getItems = createAction("[Todo Page] Get Items");
```

ჩვენ ექშენს ვაექსპორტებთ როგორც ცვლადს. ცვლადი თავის მხრივ იქმნება `createAction` ფუქნციით, რომელიც პარამეტრად იღებს ექშენის ტიპს (მის დახასიათებას) და პროპებს (იმ ინფორმაციის ტიპს, რომელიც ამ ექშენს უნდა გავატანოთ). კონვენციურად დასაწყისში ოთკუთხედ ფრჩხილებში იწერება ექშენის აღმოცენების წყარო, ჩვენთვის ეს ის გვერდია, სადაც გასაკეთებელი საქმეებია განთავსებული. ამას მოჰყვება ექშენის მოკლე დახასიათება. ჩვენ ვიცით, რომ ახალი ნივთის შექმნისას უნდა მივიღოთ ნივთის აღწერა, ამიტომაც მას პროპსში მივუთითებთ, როგორც ფუნქციის ტიპს - მან უნდა დააბრუნოს ობიექტი, რომელშიც იქნება სტრინგის ტიპის ფროფერთი `description`. თუ ექშენის პროპები არ გვჭირდება, მას უბრალოდ გამოვტოვებთ, როგორც ეს `getItems`-ის შემთხვევაშია.

ექშენმა უნდა გაიაროს რედიუსერი და ეფექტები. რედიუსერი გვინდა სთეითის უშუალოდ შესაცვლელად, ხოლო ეფექტები API-სთან დასაკავშირებლად. API-სთან ურთიერთობაში ჩვენ ხშირად ორი ტიპის ექშენი გვაქვს: წარმატების და ერორის ექშენები. თითოეული მომხარებლის ექშენის საფუძველზე, რომელიც API-სთან კავშირს საჭიროებს, ეფექტები საპასუხოდ გასცემენ ამ ექშენებს. მათთვის ცალკე ფაილში გავწეროთ ექშენები:

```ts store/actions/todo-api.actions.ts
import { createAction, props } from "@ngrx/store";
import { Item } from "src/app/item.model";

export const getItemsSuccessful = createAction(
  "[Todo Api] Get Items Successful",
  props<{ items: Item[] }>()
);

export const getItemsFailed = createAction(
  "[Todo Api] Get Items Failed",
  props<{ error: string }>()
);

export const addItemSuccessful = createAction(
  "[Todo Api] Add Item Successful",
  props<{ item: Item }>()
);

export const addItemFailed = createAction(
  "[Todo Api] Add Item Failed",
  props<{ error: string }>()
);

export const updateItemSuccessful = createAction(
  "[Todo Api] Update Item Successful",
  props<{ item: Item }>()
);

export const updateItemFailed = createAction(
  "[Todo Api] Update Item Failed",
  props<{ error: string }>()
);

export const deleteItemSuccessful = createAction(
  "[Todo Api] Delete Item Successful",
  props<{ id: number }>()
);

export const deleteItemFailed = createAction(
  "[Todo Api] Delete Item Failed",
  props<{ error: string }>()
);
```

სილამაზისთვის იმავე ფოლდერში index.ts შევქმნათ, საიდანაც დავაექსპორტებთ ყველა ექშენს, რომელიც ექშენების ერთი ფოლდერში იქნება ნეიმსფეისით ([Namespace](https://developer.mozilla.org/en-US/docs/Glossary/Namespace)), TodoActions ხოლო მეორეში TodoApiActions. ასე მოვიქცევით სთორის ყველა ელემენტისთვის.

```ts store/actions/index.ts
export * as TodoActions from "./todo.actions";
export * as TodoApiActions from "./todo-api.actions";
```

მაგალითად, ახალი ნივთის შექმნის ექშენმა (`addItem`) უშუალოდ სთეითში მხოლოდ ის უნდა ასახოს, რომ მიმდინარეობს API-სგან პასუხის მოლოდინი. ამის შემდეგ, ეფექტებმა უნდა დააფიქსირონ ეს ექშენი, მოთხოვნა გაგზავნონ სერვერზე და გასცენ ახალი ექშენი `addItemSuccessful`, რომელის prop-საც რედიუსერი სთეითში განათავსებს. ჯერ ნივთების აღების ექშენსა და მოლოდინის სთეითს მივხედოთ. შევქმნათ ჩვენი აპლიკაციის სთეითის ტიპი, რომლითაც რედიუსერი იხელმძღვანელებს:

```ts store/state/todo.state.ts
import { Item } from "src/app/item.model";

export interface TodoState {
  items: Item[];
  loading: boolean;
  error: string;
}
```

სთეითში გვინდა ნივთების სია, ჩატვირთვა მიმდინარეობს თუ არა და არსებობს თუ არა ერორი.
ესეც დავაექსპორტოთ index.ts-დან.

```ts store/state/index.ts
export * from "./todo.state";
```

ახლა შევქმნათ რედიუსერი:

```ts store/state/reducers/todo.reducer.ts
import { createReducer, on } from "@ngrx/store";
import { TodoActions } from "../actions";
import { TodoState } from "../state";

const initialState: TodoState = {
  items: [],
  loading: false,
  error: "",
};

export const todoReducer = createReducer(
  initialState,
  // Get Items
  on(TodoActions.getItems, (state) => ({ ...state, loading: true }))
  on(TodoApiActions.getItemsSuccessful, (state, { items }) => ({
    ...state,
    items: items,
    loading: false,
  })),
  on(TodoApiActions.getItemsFailed, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
);
```

რედიუსერი იქმნება `createReducer` ფუნქციით, რომელიც პირველ არგუმენტად პირვანდელ სთეითს იღებს. პირვანდელ სთეითს ჩვენ ინიციალიზაციას ვუკეთებთ ამავე ფაილში. აპლიკაცია პირვანდელ მდგომარეობაში შეიცავს ნივთების ცარიელ სიას, ჩატვირთვას უარყოფითი მნიშვნელობით და ერორს, როგორც ცარიელ სტრინგს.
შემდეგ არგუმენტებად რედიუსერი იღებს `on` ფუნქციებს. `on` ფუნქციები განსაზღვრავს თითოეული ექშენის საფუძველზე (პირველი არგუმენტი) როგორ უნდა შეიცვალოს სთეითი (მეორე არგუმენტი ქოლბექის ფორმით).
ქოლბექ ფუნქციაში ვაბრუნებთ სთეითს დასპრედილი ფორმით, რათა ყოველმა ახალმა ექშენმა შეინარჩუნოს და არ წაშალოს წინა სთეითი. მას შემდეგ ობიექტში ჩვენთვის სასურველ სთეითის ნაწილებს მნიშვნელობას შევუცვლით. როცა მომხმარებელი ნივთების მიღების ექშენს განახორციელებს, ჩვენ უნდა გამოვაჩინოთ მოლოდინის მდგომარეობა, მაშასადამე loading-ს გავხდით ჭეშმარიტს. ამის საფუძველზე ჩვენ უნდა გამოვაჩინოთ ვებ-გვერდზე ჩატვირთვის სპინერი. ნივთების წარმატებით მიღების შემთხვევაში, ჩვენ უნდა ამ ექშენის props-იდან მიღებული ახალი ნივთი სთეითში განვათავსოთ, ხოლო loading გავხადოთ მცდარი.
მაგრამ როგორ ავიღოთ loading ფროფერთი ან items სთეითიდან? სელექტორების საშუალებით! მაგრამ ჯერ ჩვენი რედიუსერი დავარეგისტრიროთ მოდულში, რათა ანგულარმა ის დააფიქსიროს.

```ts store/state/reducers/index.ts
export * from "./todo.reducer";
```

```ts app.module.ts
// ... other imports
import { StoreModule } from "@ngrx/store";
import { todoReducer } from "./store/reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

@NgModule({
  declarations: [AppComponent, ItemComponent, InputComponent],
  imports: [
    // ... other imports
    StoreModule.forRoot({ todo: todoReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

> **შენიშვნა:** თუ აპლიკაციაში სხვა კონკრეტული მოდულებიც გვაქვს, app.module.ts-ში forRoot ფუნქცია დარჩება ცარიელი, ხოლო სხვა feature მოდულებში, მაგალითად თუ გვაქვს ცალკე notes და todo feature-ები, გვექნება `StoreModule.forFeature({ notes: notesreducer })` და `StoreModule.forFeature({ todo: todoreducer })`. უმჯობესია, რომ ყველა feature module-ს თავისი სთორი ჰქონდეს.

ჩვენ ანგულარს ვეუბნებით, რომ ვარეგისტრირებთ რედიუსერს, რომელიც ასოცირებული იქნება სახელთან "todo". ეს უკანასკნელი დაგვჭირდება სელექტორების შესაქმნელად.

```ts store/state/selectors/todo.selectors.ts
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TodoState } from "../state";

export const selectTodo = createFeatureSelector<TodoState>("todo");

export const selectLoading = createSelector(
  selectTodo,
  (state: TodoState) => state.loading
);

export const selectItems = createSelector(
  selectTodo,
  (state: TodoState) => state.items
);

export const selectError = createSelector(
  selectTodo,
  (state: TodoState) => state.error
);
```

`createFeatureSelector`-ის საშუალებით ჩვენ სელექტორს ვქმნით კონკრეტული feature-ისთვის. ჩვენ რედიუსერს მოდულში ასოციაცია გავუკეთეთ "todo" სახელთან, ამიტომ არგუმენტად სწორედ ამ სახელს ვწერთ. სთორი სთეითისგან ინფორმაციას ამის საფუძველზე აიღებს და დაგვიბრუნებს სტრიმის ფორმით. შემდეგ სთეითის თითოეული ნაწილისთვის ცალკე ვქმნით სელექტორებს `createSelector` ფუნქციით, რომელიც ამ feature სელექტორისგან იღებენ მის კონკრეტულ ნაწილს. კონვენვიურად სელექტორები select-ით იწყება.

ახლა გამოვიყენოთ selectLoading app.component-ში და ამასთანავე, გავცეთ ექშენი. ყველაფერი ზედმეტი წავშალოთ.

```ts app.component.ts
/// ... other imports
import { Store } from "@ngrx/store";
import { TodoActions } from "./store/actions";
import { TodoSelectors } from "./store/selectors";

// ...
export class AppComponent implements OnInit {
  items$ = this.store.select(TodoSelectors.selectItems);
  loading$ = this.store.select(TodoSelectors.selectLoading);
  error$ = this.store.select(TodoSelectors.selectError);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(TodoActions.getItems());
  }
}
```

ჩვენ კონსტრუქტორში დავაინჯექთეთ Store, რომელიც წვდომას გვაძლევს სთეითის სელექტორებსა და ექშენის გაშვების ფუნქციებზე. სელექტორებს ვინახავთ ფროფერთიებით, რომლებიც კონვენციურად $-ით ბოლოვდება, რადგან ისინი observable-ებს წარმოადგენენ.

როცა აპლიკაცია იტვირთება, ეს უკვე ნიშნავს იმას, რომ მომხმარებელს ნივთების მიღება სურს, მაშასადამე ჩვენ უნდა სთორის საშუალებით `getItems` ექშენს დავუძახოთ.

თემფლეითში შეგვიძლია observable-ებს მოვუსმინოთ `ngIf` დირექტივში, async ფაიფის საშუალებით. ეს ფაიფი ავტომატურად დაასუბსქრაიბებს ამ observable-ს და საჭიროების შემთხვევაში სუბსქრაიბს გააუქმებს კიდევაც (ts-ში ამის ხელით წერას ფაიფი ნამდვილად ჯობია!):

```html app.component.html
<div class="container">
  <app-input></app-input>
  <ng-container *ngIf="error$ | async as error">
    <h2 class="error">{{ error }}</h2>
  </ng-container>
  <ng-container *ngIf="items$ | async as items">
    <app-item *ngFor="let item of items" [item]="item"></app-item>
  </ng-container>
  <ng-container *ngIf="loading$ | async">
    <div class="spinner-container">
      <img src="../assets/tail-spin.svg" alt="loading spinner" />
    </div>
  </ng-container>
</div>
```

როცა observable რაიმე მისაღებ (truethy) მნიშვნელობას მიიღებს, ელემენტი, რომელზეც დირექტივია განთავსებული, გამოჩნდება. ერორის შემთხვევაში, მაგალითად, შეგვიძლია `as error`-ის საშუალებით ამ საბოლოო მნიშვნელობას ჩავწვდეთ, და თემფლეითში გამოვსახოთ, თუკი რაიმე ხარვეზი გაგვიჩნდა. იგივე ხდება items-ისა და loading-ის შემთხვევაში.

ბრაუზერში ახლა ჩატვირთვის სპინერი უნდა გამოჩნდეს. Redux Devtools-ს თუ შევხედავთ, ვნახავთ, რომ გაიცა ექშენი "\[Todo Page\] Get Items", რომელმაც სთეითში loading-ის მნიშვნელობა შეცვალა, ის კი async ფაიფის საშუალებით ავტომატურად აისახა ჩვენს აპლიკაციაში!

## Effects

აშკარა პრობლემა გვაქვს: ნივთები ჯერ არ გამოჩენილა, რადგან საწყის სთეითში ის ცარიელია, ჩვენ კი API-სთვის არ დაგვიძახებია, რომ ისინი აგვეღო. მაშ, შევქმნათ ეფექტები! ჯერ ItemsService-ში `tap` ოპერატორები და ზედმეტი ცვლადები მოვაშოროთ. ისინი აღარ დაგვჭირდება.

```ts items.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment";
import { Item } from "./item.model";

@Injectable({ providedIn: "root" })
export class ItemsService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getItems() {
    return this.httpClient.get<Item[]>(this.baseUrl);
  }

  addItem(newItemDesc: string) {
    const newItem = {
      description: newItemDesc,
      done: false,
    };
    return this.httpClient.post<Item>(this.baseUrl, newItem);
  }

  deleteItem(id: number) {
    return this.httpClient.delete(this.baseUrl + id).pipe(
      map(() => {
        return id;
      })
    );
  }

  updateItem(item: Item) {
    return this.httpClient.patch<Item>(this.baseUrl + item.id, {
      description: item.description,
      done: item.done,
    });
  }
}
```

ახლა კი შევქმნათ ეფექტები:

```ts store/state/effects/todo.effects.ts
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ItemsService } from "src/app/items.service";
import { TodoActions, TodoApiActions } from "../actions";

@Injectable()
export class TodoEffects {
  getItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.getItems),
      mergeMap(() =>
        this.itemsService.getItems().pipe(
          map((items) => TodoApiActions.getItemsSuccessful({ items })),
          catchError((err: HttpErrorResponse) =>
            of(
              TodoApiActions.getItemsFailed({
                error: `Failed to get items!: Server responded with: ${err.message}`,
              })
            )
          )
        )
      )
    );
  });

  constructor(private actions$: Actions, private itemsService: ItemsService) {}
}
```

არ შეგეშინდეთ, RxJs თქვენი მეგობარია! ჩვენ ვქმნით ეფექტების კლასს, რომელზეც უნდა გამოვიყენოთ `@injectable()` დეკორატორი (რადგან ის სერვისივით მუშაობს). კლასში განვსაზღვრავთ ეფექტებს, რომლებიც ფაქტობრივად subscription-ებია. ისინი `createEffect` ფუნქციით იქმნება. ქოლბექში ჩვენ ვასუბსქრაიბებთ ექშენების სტრიმს, რომელსაც სთორი გვაწვდის Actions-ის სახით. ჩვენ სტრიმი უნდა გავფილტროთ, რადგან `getItems$` ეფექტმა მხოლოდ ერთი ექშენზე უნდა მოახდინოს რეაგირება - `TodoActions.getItems`. `pipe` ოპერატორში სწორედ ამიტომ ვიყენებთ `ofType` ოპერატორს. შემდეგ, `mergeMap`-ის საშუალებით ჩვენ დავაბრუნებთ სერვისის API-სთან დაძახებას, სადაც ჩვენ გვინდა, რომ `map` ოპერატორით ამოვიღოთ სერვერიდან მოსული პასუხი (ნივთები) და ის ჩვენი TodoApiActions-ის ექშენს გადავცეთ, რომელსაც `observable`-ის ფორმით ვაბრუნებთ. `catchError`-ს ჩვენ სერვისზე დაძახებულ `pipe` ოპერატორში `map`-ის შემდეგ ვიყენებთ, რათა წარუმატებელობის შემთხვევაში აღვრიცხოთ, რა სახის ერორი დაგვიბრუნა სერვერმა. ეს ერორი HttpErrorResponse-ის ტიპისაა ამ პროექტის შემთხვევაში. ამ ერორის მესიჯს ჩვენ გამოვიყენებთ ექშენში ერორის ტექსტის შესაქმნელად, რომელსაც ჩვენ `of` ოპერატორში ვატარებთ, რადგან catchError თვითონ observable-ს არ აბრუნებს, რაც ეფექტისთვისაა საჭირო. `of` ოპერატორი სწორედაც observable-ში შეფუთულ ექშენს დაგვიბრუნებს.

```ts store/state/effects/index.ts
export * from "./todo.effects";
```

ახლა დავარეგისტრიროთ ჩვენი ეფექტები მოდულში:

```ts app.module.ts
/// ... other imports
import { StoreModule } from "@ngrx/store";
import { todoReducer } from "./store/reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { TodoEffects } from "./store/effects";

@NgModule({
  // ...
  imports: [
    // ...
    StoreModule.forRoot({ todo: todoReducer }),
    EffectsModule.forRoot([TodoEffects]),
    // ...
  ],
  // ...
})
export class AppModule {}
```

> **შენიშვნა:** განათავსეთ ეფექტი Array-ში, რადგან ეფექტი ერთზე მეტი შეიძლება გვქონდეს.

ბრაუზერში შევიჭყიტოთ. ჩვენი ნივთები როგორც იქნა გამოჩნდა! Redux-ის დევთულზში კი ვხედავთ, რომ "\[Todo Page\] Get Items"-ს მოჰყვა "\[Todo Api\] Get Items Successful", რომელმაც სთეითში დაგვიმატა ახალი ნივთები, ხოლო loading გადაცვალა false-ზე (როგორც ჩვენ ეს რედიუსერში მივუთითეთ). ახლა აპლიკაციის სხვა ფუნქციებს მივხედოთ, თან უკეთესი პრაქტიკის პატერნებს მივყვეთ.

## უკეთესი პატერნები

ძირითადი ლოგიკა, რომელიც სთორს ეხება უნდა იყოს განთავსებული ერთ კონტეინერ კომპონენტში, მას შიგნით არსებული პატარა კომპონენტები კი უბრალოდ მონაცემებს იღებენ ზედა კომპონენტიდან, მას თემფლეითში განათავსებენ და უბრალოდ ივენთებს აემითებენ. ასერომ მოვაშოროთ სერვისებთან დაკავშირებული ლოგიკა input კომპონენტიდან და item კომპონენტიდან.

```ts input/input.component.ts
import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"],
})
export class InputComponent {
  @Output() newItem = new EventEmitter();

  onNewItem(inputElement: HTMLInputElement) {
    const newItemDesc = inputElement.value;
    if (newItemDesc) {
      this.newItem.emit(newItemDesc);
      inputElement.value = "";
    }
  }
}
```

```ts item/item.component.ts
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Item } from "../item.model";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"],
})
export class ItemComponent {
  @Input() item: Item;
  @Output() delete = new EventEmitter<number>();
  @Output() updateItem = new EventEmitter<Item>();

  onDeleteItem() {
    this.delete.emit(this.item.id);
  }

  onItemDone() {
    this.updateItem.emit({ ...this.item, done: !this.item.done });
  }
}
```

კონტეინერ კომპონენტში, ანუ app.component.html-ში, მოვუსმინოთ ამ კომპონენტების ივენთებს:

```html app.component.html
<div class="container">
  <app-input (newItem)="onNewItem($event)"></app-input>
  <ng-container *ngIf="error$ | async as error">
    <h2 class="error">{{ error }}</h2>
  </ng-container>
  <ng-container *ngIf="items$ | async as items">
    <app-item
      *ngFor="let item of items"
      [item]="item"
      (delete)="onDelete($event)"
      (updateItem)="onUpdateItem($event)"
    ></app-item>
  </ng-container>
  <ng-container *ngIf="loading$ | async">
    <div class="spinner-container">
      <img src="../assets/tail-spin.svg" alt="loading spinner" />
    </div>
  </ng-container>
</div>
```

და სათანადო ექშენები გავცეთ ივენთების მიხედვით, რომლებსაც სათანადო prop-ებს გავატანთ:

```ts app.component.ts
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Item } from "./item.model";
import { TodoActions } from "./store/actions";
import { TodoSelectors } from "./store/selectors";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  items$ = this.store.select(TodoSelectors.selectItems);
  loading$ = this.store.select(TodoSelectors.selectLoading);
  error$ = this.store.select(TodoSelectors.selectError);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(TodoActions.getItems());
  }

  onNewItem(description: string) {
    this.store.dispatch(TodoActions.addItem({ description }));
  }

  onDelete(id: number) {
    this.store.dispatch(TodoActions.deleteItem({ id }));
  }

  onUpdateItem(item: Item) {
    this.store.dispatch(TodoActions.updateItem({ item }));
  }
}
```

## აპლიკაციის დანარჩენი ფუნქციები NgRx-ით

ახლა რედიუსერში დავწეროთ რა უნდა მოხდეს დანარჩენი ექშენების შემთხვევაში:

```ts store/reducers/todo.reducers.ts
import { createReducer, on } from "@ngrx/store";
import { TodoActions, TodoApiActions } from "../actions";
import { TodoState } from "../state";
import { TodoUtils } from "../util/todo.util";

const initialState: TodoState = {
  items: [],
  loading: false,
  error: "",
};

export const todoReducer = createReducer(
  initialState,

  // Get Items
  on(TodoActions.getItems, (state) => ({ ...state, loading: true })),
  on(TodoApiActions.getItemsSuccessful, (state, { items }) => ({
    ...state,
    items: items,
    loading: false,
  })),
  on(TodoApiActions.getItemsFailed, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),

  // Add Item
  on(TodoActions.addItem, (state) => ({ ...state, loading: true })),
  on(TodoApiActions.addItemSuccessful, (state, { item }) => ({
    ...state,
    items: [item, ...state.items],
    loading: false,
  })),
  on(TodoApiActions.addItemFailed, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),

  // Delete Item
  on(TodoActions.deleteItem, (state) => ({ ...state, loading: true })),
  on(TodoApiActions.deleteItemSuccessful, (state, { id }) => ({
    ...state,
    items: TodoUtils.removeItem(state.items, id),
    loading: false,
  })),
  on(TodoApiActions.deleteItemFailed, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),

  // Update Item
  on(TodoActions.updateItem, (state) => ({ ...state, loading: true })),
  on(TodoApiActions.updateItemSuccessful, (state, { item }) => ({
    ...state,
    items: state.items.map((i) => {
      if (i.id === item.id) {
        return item;
      } else {
        return i;
      }
    }),
    loading: false,
  })),
  on(TodoApiActions.updateItemFailed, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  }))
);
```

ნივთის წაშლის წარმატებულად დამთავრების შემთხვევაში ნივთის ამოსაშლელად TodoUtils-ში შექმნილ ფუნქციას ვიყენებთ, რათა რედიუსერი რთული წასაკითხი არ გახდეს:

```ts store/util/todo.utils.ts
import { Item } from "src/app/item.model";

export class TodoUtils {
  public static removeItem(items: Item[], id: number) {
    const result = [...items];
    const itemindex = result.findIndex((i) => i.id === id);
    result.splice(itemindex, 1);
    return result;
  }
}
```

რა თქმა უნდა, ეს სამი ახალი ექშენი კომპონენტში უბრალოდ ჩატვირთვის სპინერს გაგვიჩენს აპლიკაციაში, რადგან მათთვის ეფექტები ჯერ არ დაგვიწერია. ასე უნდა გამოიყურებოდეს ეფექტების მთლიანი კოდი:

```ts store/effects/todo.effects.ts
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ItemsService } from "src/app/items.service";
import { TodoActions, TodoApiActions } from "../actions";

@Injectable()
export class TodoEffects {
  getItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.getItems),
      mergeMap(() =>
        this.itemsService.getItems().pipe(
          map((items) => TodoApiActions.getItemsSuccessful({ items })),
          catchError((err: HttpErrorResponse) =>
            of(
              TodoApiActions.getItemsFailed({
                error: `Failed to get items!: Server responded with: ${err.message}`,
              })
            )
          )
        )
      )
    );
  });

  addItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.addItem),
      mergeMap(({ description }) =>
        this.itemsService.addItem(description).pipe(
          map((item) => TodoApiActions.addItemSuccessful({ item })),
          catchError((err: HttpErrorResponse) =>
            of(
              TodoApiActions.getItemsFailed({
                error: `Failed to add item!: Server responded with: ${err.message}`,
              })
            )
          )
        )
      )
    );
  });

  deleteItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.deleteItem),
      mergeMap(({ id }) =>
        this.itemsService.deleteItem(id).pipe(
          map((id) => TodoApiActions.deleteItemSuccessful({ id })),
          catchError((err: HttpErrorResponse) =>
            of(
              TodoApiActions.getItemsFailed({
                error: `Failed to delete item!: Server responded with: ${err.message}`,
              })
            )
          )
        )
      )
    );
  });

  updateItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.updateItem),
      mergeMap(({ item }) =>
        this.itemsService.updateItem(item).pipe(
          map((item) => TodoApiActions.updateItemSuccessful({ item })),
          catchError((err: HttpErrorResponse) =>
            of(
              TodoApiActions.getItemsFailed({
                error: `Failed to update item!: Server responded with: ${err.message}`,
              })
            )
          )
        )
      )
    );
  });

  constructor(private actions$: Actions, private itemsService: ItemsService) {}
}
```

დააკვირდით, რომ დანარჩენ ეფექტებში `mergeMap`-ით ამჯერად ვიღებთ (დესტრუქტურიზაციის საშუალებით) ექშენების prop-ებს, რომლებსაც სერვისს ვაწვდით.

ჩვენი აპლიკაცია ახლა სრულფასოვნად უნდა მუშაობდეს NgRx-ით. ერთი შეხედვით არასაჭიროდ ბევრი კოდი ვწერეთ და თითქოს შემოვლითი გზები გამოვიყენეთ, მაგრამ როცა დიდ და რთულ აპლიკაციაზე ვმუშაობთ, NgRx-ის საშუალებით ზუსტად ვიცით სად რა უნდა მოხდეს და როგორ, რაც დეველოპმენტის პროცესს ძალიან ამარტივებს. იგი გვაიძულებს, რომ საუკეთესო პატერნებს მივყვეთ, რაც ბევრ გაუთვალისწინებელ თავის ტკივილს აგვარიდებს.

არ იფიქროთ, რომ NgRx-ს ერთი წაკითხვით დაეუფლებით. საჭიროების შემთხვევაში რამდენიმეჯერ გადაიკითხეთ ეს მასალა, გაეცანით ოფიციალურ დოკუმენტაციებს და, რა თქმა უნდა, თქვენით სცადეთ მისი გამოყენება.

წარმატებები!

## კოდის რეპოზიტორია

- [საწყისი კოდი](https://github.com/CondensedMilk7/ng-lesson-todo/tree/ngrx-starter)
- [საბოლოო კოდი](https://github.com/CondensedMilk7/ng-lesson-todo/tree/ngrx-finished)

## დოკუმენტაციები

- [RxJs Docs](https://rxjs.dev/)
- [NgRx Docs](https://ngrx.io/docs)
