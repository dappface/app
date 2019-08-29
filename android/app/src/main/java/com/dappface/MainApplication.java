package com.dappface;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.ReactInstanceManager;
import com.microsoft.codepush.react.ReactInstanceHolder;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
   @Override
   protected ReactGateway createReactGateway() {
       ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
           @Override
           protected String getJSMainModuleName() {
               return "index";
           }
       };
       return new ReactGateway(this, isDebug(), host);
   }


  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
            new RNCWebViewPackage(),
            new Interactable(),
            new SplashScreenReactPackage(),
            new VectorIconsPackage(),
            new FingerprintAuthPackage(),
            new RandomBytesPackage(),
            new OrientationPackage(),
            new KeychainPackage(),
            new RNFSPackage(),
            new RNDeviceInfo(),
            new RNCameraPackage(),
            new RNGestureHandlerPackage(),
            new RNSecureRandomPackage(),
            new RNFirebasePackage(),
            new RNCameraPackage(),
      new NavigationReactPackage(),
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }

  @Override
  public String getJSBundleFile() {
    return CodePush.getJSBundleFile();
  }

  @Override
  public String getJSMainModuleName() {
    return "index";
  }

  @Override
  public ReactInstanceManager getReactInstanceManager() {
    return getReactNativeHost().getReactInstanceManager();
  }
}
