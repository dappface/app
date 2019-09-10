package com.dappface;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

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
    @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      packages.add(new RNCWebViewPackage());
      packages.add(new Interactable());
      packages.add(new SplashScreenReactPackage());
      packages.add(new VectorIconsPackage());
      packages.add(new FingerprintAuthPackage());
      packages.add(new RandomBytesPackage());
      packages.add(new OrientationPackage());
      packages.add(new KeychainPackage());
      packages.add(new RNFSPackage());
      packages.add(new RNDeviceInfo());
      packages.add(new RNCameraPackage());
      packages.add(new RNGestureHandlerPackage());
      packages.add(new RNSecureRandomPackage());
      packages.add(new RNFirebasePackage());
      packages.add(new RNCameraPackage());
      packages.add(new NavigationReactPackage());
      return packages;
    }
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
