package com.dappface;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
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

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
