# 基于NX开发Angular项目

### 项目依赖的安装

> Node和NPM的安装

​	网上教程较多，可以自行搜索，下面给出2个链接：

​	[mac的安装](https://www.jianshu.com/p/20ea93641bda)

​	[pc的安装](https://www.cnblogs.com/zhouyu2017/p/6485265.html)



> NX的安装

​	全局安装NX CLI

```bash
npm install -g @nrwl/schematics
```

​	全局安装Angular CLI

```bash
npm install -g @angular/cli
```

​	[官网教程](https://nrwl.io/nx/guide-getting-started)



> ng-packagr的安装

​	在项目中安装

```bash
> npm i ng-packagr --save-dev
```

​	[github](https://github.com/dherges/ng-packagr)



### 创建一个workspace项目

> **首先通过nx命令行建立一个workspace**

```bash
> create-nx-workspace example
```

​	该过程中会自动安装所需的各项依赖，请确保通过nx命令建立workspace，避免因使用webpack或ng-cli创建项目，带来各项依赖的额外安装。



> **当nx workspace建立之后，我们需要在example的app中建立对应的项目**

```bash
> ng generate app myapp --routing
```

​	其中myapp是项目名称，—routing是自动增加路由依赖参数，由于项目会使用到路由，因此我们在建立项目时带上这个参数。如果忘记带上routing参数，也可以后续手动添加，不影响实际开发。

​	***有些时候当nx或一些依赖的版本发生更新时，会出现一些预料之外的错误***

```bash
Error: Cannot find module '~/example/node_modules/prettier/bin/prettier.js'
```

​	*此时可以[参考官网issue](https://github.com/nrwl/nx/issues/198),此类问题一般是由于依赖更新导致的，更新一下依赖就可以解决类似问题*

```bash
> npm install prettier@1.10.1 -D
```

​	当项目建立完成之后，我们可以看到在apps目录下建立了myapp这个目录，以及完整的代码结构。同时我们在vscode中会发现.angular-cli.json被更新了，其中被加入myapp的项目配置，一般情况下不需要去修改这些配置。

```json
{
      "name": "myapp",
      "root": "apps/myapp/src",
      "outDir": "dist/apps/myapp",
      "assets": [
        "assets",
        "favicon.ico"
      ],
      "index": "index.html",
      "main": "main.ts",
      "polyfills": "polyfills.ts",
      "test": "../../../test.js",
      "tsconfig": "tsconfig.app.json",
      "testTsconfig": "../../../tsconfig.spec.json",
      "prefix": "app",
      "styles": [
        "styles.css"
      ],
      "scripts": [],
      "environmentSource": "environments/environment.ts",
      "environments": {
        "dev": "environments/environment.ts",
        "prod": "environments/environment.prod.ts"
      }
    }
```



> **建立完myapp之后，我们可以先运行一下实例，看看是否能够跑通**

```bash
> ng serve -a=myapp
```

​	键入命令行之后，我们能够通过http://localhost:4200/地址来进行查看，4200是ng serve的默认端口，也可以通过 -port=端口号 进行修改。-a=myapp是指定运行myapp，如果有其他项目也是用相同的方式来开启。当我们愉快的看见浏览器中的NX标志后，意味着我们的项目已经跑通了。



### 为APP加点料

> **建立为myapp服务的lib**

​	在没有workspace概念之前，一般的开发过程是先在app中实施，而后再将完成的代码拆分到另一个库，并且打成NPM包。这个方法及其难以维护，即使通过git的submodule来做处理依然不是非常的流畅。而现在NX为我们提供了一种快捷的实现方式。

```bash
>ng g lib myapp-feature --routing
```

​	几乎和创建app同样的方式，我们在libs目录下创建了名为myapp-feature的lib，因为需要路由，我们把路由也带上了。观察一下.angular-cli.json，同样，新的lib也被更新了。

```json
    {
      "name": "myapp-feature",
      "root": "libs/myapp-feature/src",
      "test": "../../../test.js",
      "appRoot": ""
    }
```

​	接下来就是在myapp中引用lib，NX为我们提供了一个方便的别名引用方式。

```typescript
import { MyappFeatureModule } from '@ebiz-example/myapp-feature';
```

​	我们在app.module.ts下加入引用，其中ebiz-example是我们在package.json的name配置项的值，myapp-feature是libs下的目录。在app和lib的module下的constructor里分别添加console，然后运行app，我们可以发现lib已经被顺利引入。



> **为myapp添加基于ngrx的state manage**

​	对于Component间的通讯，我们需要寻找一个state manage的方案，而继承了redux思路的ngrx是个非常不错的选择，很幸运的，NX为我们集成了快速添加ngrx的方式。

```bash
> ng g ngrx root -m=apps/myapp/src/app/app.module.ts --root
```

​	命令完成后，我们会发现在app目录下多出了+state目录，因为使用了-m所以在app.module.ts文件中为我们加入了相应的代码，—root则为我们指定了使用forRoot方式。

```typescript
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { rootReducer } from './+state/root.reducer';
import { rootInitialState } from './+state/root.init';
import { RootEffects } from './+state/root.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  imports: [
    StoreModule.forRoot({ root: rootReducer }, { initialState: { root: rootInitialState } }),
    EffectsModule.forRoot([RootEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule
  ],
})

```

​	其中不仅有@ngrx/store和@ngrx/effects，Devtools也为我们准备好了，接下来启动一下服务器,打开Chrome的Redux Devtools,我们可以看到ngrx已经顺利的启动了。

​	除了app之外，lib也会有state manage的需求，我们一样可以通过ng-cli来进行添加，我们先为lib添加一个module，并为module添加state。

```bash
> ng g module subfeature -a=myapp-feature —routing
> ng g component subfeature -a=myapp-feature
> ng g ngrx userinfo -m=libs/myapp-feature/src/subfeature/subfeature.module.ts
```

​	我们顺利的添加了module和component，如果需要自动注入myapp-feature，也可以加上-m来做到。在添加了ngrx后，同样的+state被加入了代码，其中在subfeature.module.ts有个细微的差别是需要注意的。

```typescript
@NgModule({
  imports: [
    StoreModule.forFeature('userinfo', userinfoReducer, { initialState: userinfoInitialState }),
    EffectsModule.forFeature([UserinfoEffects])
  ]
})
```

​	在子module中，我们应该使用forFeature，只有在根module中我们才会使用—root。

​	将subfeature注入myapp-feature再次启动服务，我们打开Redux Devtools，可以确认userinfo已经被加入到state tree。



### 为分享Lib做准备

> **将开发成熟的Lib交付出去**

​	当项目开发到一定阶段，很多时候，我们会希望将libs目录下的功能模组分享给其他的团队来使用，如果是希望将代码分享出去，比较建议的方式是使用git的submodule，具体命令可以参考help。

```bash
> git submodule --help
```



> **将代码封包并进行管理**

​	有的时候我们并不希望其他团队来修改我们的代码，因此将编制完成的Lib打包成NPM，提供给对方进行依赖是一个比较好的方案。

​	对于Private Lib，一般我们不会提交给Public repo，因此你需要自己搭建一个NPM repo，比如Nexus。当Nexus安装完后，我们还需要对package.json进行设置，主要是2个配置项。

```json
  "publishConfig": {
    "registry": "http://dkh01.ebizprise.com/repository/ebiz-npm-private/"
  },
```

```json
  "private": false,
```

​	这2项配置确保了你的npm包是可以发布的，并被正确发布到Private NPM repo。



> **使用ng-packagr来进行打包**

​	如果是一个es的函数库，我们可以很愉快的直接使用npm publish命令，如果是一个ts的函数库，我们也可以先执行一个tsc进行编译，然后愉快的npm publish。

​	然而作为一个angular的lib，特别是带有各种Component的lib，这个过程就会麻烦许多。我们都知道Component的templateUrl和styleUrls都是以字符来获取相应的资源文件，而这在打包时会显然会领我们变得不那么愉快，因此需要进行额外处理，比如用gulp预处理代码，而后打包。

​	幸运的是，我们还能使用ng-packagr来进行打包，首先我们来新建ng-package.json文件。

```json
{
  "$schema": "./node_modules/ng-packagr/ng-package.schema.json",
  "lib": {
    "entryFile": "public_api.ts",
    "externals": {
      "primeng/primeng": "primeng",
      "primeng/components/common/messageservice":
        "primeng/components/common/messageservice",
      "rxjs": "Rx",
      "@nrwl/nx": "@nrwl/nx",
      "@ngrx":"@ngrx",
      "@ngrx/store":"@ngrx/store",
      "@ngrx/store-devtools":"@ngrx/store-devtools",
      "@ngrx/effects":"@ngrx/effects"
    }
  }
}
```

​	这里定义了ng-packagr的schema，以及一些外部引用时希望能正确认知的第三方库。有一个比较关键的是entryFile，这个配置项是我们设置的一个入口，为此我们新建了一个public_api.ts文件。

```javascript
	export * from "./libs/myapp-feature";
```

​	这里我们可以指定将一个或多个lib打入一个NPM包中，所以你希望打包什么就在这个文件进行定义吧。

​	在这2个文件定义完成之后，我们可以执行打包命令了，先将这个命令写进package.json中，方便运行。

```json
"scripts": {
    "packagr": "ng-packagr -p ng-package.json",
    }
```

​	执行npm run packagr，有的时候一些引用可能会查找错误，我们需要显式的引用这些依赖。

```
BUILD ERROR
Error at /Users/aaronjin/eBizprise/ebiz-example/.ng_pkg_build/ebiz-example/ts/libs/myapp-feature/src/subfeature/+state/userinfo.effects.ts:11:3: Public property 'loadData' of exported class has or is using name 'Observable' from external module "/Users/aaronjin/eBizprise/ebiz-example/node_modules/rxjs/Observable" but cannot be named.
```

​	比如这样的错误，就需要去添加引用。

```typescript
import { Observable } from 'rxjs/Observable';
```

​	有些可以通过ng-package.json的externals配置来解决，基本上ng-packagr在打包时会碰到的问题，都是类似第三方的加载不能判别。



> **发布到Nexus**

​	如果代码没有问题，你可以在项目下找到dist目录了，这个就是我们打包出来的代码了。

​	代码的命名是根据package.json里的name来设置的，我们不需要去修改它，查看dist目录下的package.json。

```json
    "name": "ebiz-example",
    "version": "0.0.0",
    "license": "MIT",
    "publishConfig": {
        "registry": "http://dkh01.ebizprise.com/repository/ebiz-npm-private/"
    },
```

​	我们将ebiz-example修改为@ebiz-ex/feature，以区分线上和本地项目，并且将version修改为0.0.1，，当然也是可以在pre-publish用npm version patch来提升版本。

​	然后我们执行npm publish dist,返回了如下信息，我们就会发现NPM已经发布成功了。

```bash
+ @ebiz-ex/feature@0.0.1
```



> **通过NPM引用打包好的lib**

​	使用Private lib之前，我们要切换到Nexus服务器，平时则可以使用标准官网地址来加快访问速度

```bash
> npm config set registry  http://dkh01.ebizprise.com/repository/ebiz-npm-all/
或
> npm config set registry  http://registry.npmjs.org
```

​	使用npm命令将已经打包好的lib包引入项目。

```bash
> npm i @ebiz-ex/feature --save
```

​	将app.module.ts中的引用进行修改。

```typescript
import { MyappFeatureModule } from '@ebiz-ex/feature';
```

​	再次运行ng server，我们发现使用打包后的NPM包和我们使用在nx项目中的lib包是一致的。



> **通过文件引用打包好的lib**

​	有些时候我们没有Private repo，那么能不能用打包好的NPM哪？答案是肯定的，把dist目录打包成tgz，然后放在项目中，添加package.json的引用。

```json
        "@ebiz-ex/feature": "file:.feature-0.0.1.tgz",
```

​	将app.module.ts中的引用进行修改。

```typescript
import { MyappFeatureModule } from '@ebiz-ex/feature';
```

​	再次运行ng server，我们发现使用打包后的NPM包和我们使用在nx项目中的lib包是一致的。



### 是否使用这套方案

> Mono Repo or Muti Repo

​	两个方案的优劣不需要再做过多阐述，这里只想说明NX是一个基于Mono Repo的Workspace方案，如果项目更偏向Muti Repo，则完全不要考虑NX。

​	NX带来最大的优势是统一管理，易于部署，并且不需要为不同的App或Lib反复同步NPM包，并且可以较为方便的将代码拆分开。如果这些能直击痛点，那么不要犹豫的选择NX吧。



> NX的侵入性

​	NX集成了较多的功能，有些或许是未必需要用到的，比如不使用@ngrx或者不想使用@ngrx/effects，这些都是需要考虑的范畴。不过NX最大的问题在于对ng-cli的侵入，我们查看package.json，可以发现使用了file的调用方式。

```
"@angular/cli": "file:.angular_cli.tgz",
```

​	而这一系列的侵入导致了另一个问题，当Lib处于项目下时，可以正常的使用AOT进行编译，而当我们用ng-packagr进行NPM打包之后再引入，进行AOT就会出现问题。

```
ERROR in ./apps/myapp/src/main.ts
Module not found: Error: Can't resolve './app/app.module.ngfactory' in '/Users/aaronjin/eBizprise/ebiz-example/apps/myapp/src'
resolve './app/app.module.ngfactory' in '/Users/aaronjin/eBizprise/ebiz-example/apps/myapp/src'
```

​	这个问题是由于ng、ts的版本冲突引起，具体的解决方案仍未找到，因此使用这套方案仍需谨慎。



> ng-packagr的不足

​	这个打包方案除了版本冲突的可能，仍有一些其他的不足，比如使用ng router的loadchildren异步机制，就会出现这样的元数据丢失情况。

```bash
No NgModule metadata found for 'MyappFeatureModule'.
```

