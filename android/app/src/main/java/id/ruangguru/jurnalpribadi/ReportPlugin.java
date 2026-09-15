package id.ruangguru.jurnalpribadi;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.print.PrintManager;
import androidx.core.content.FileProvider;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
@CapacitorPlugin(name="GuruReports")
public class ReportPlugin extends Plugin {
  @PluginMethod public void exportCsv(PluginCall call) {
    try {
      String name = call.getString("name", "laporan").replaceAll("[^a-zA-Z0-9_-]", "_");
      File directory = new File(getContext().getCacheDir(), "reports");
      if (!directory.exists() && !directory.mkdirs()) throw new Exception("Folder tidak tersedia");
      File target = new File(directory, name + ".csv");
      try (FileOutputStream stream = new FileOutputStream(target)) {
        stream.write(call.getString("contents", "").getBytes(StandardCharsets.UTF_8));
      }
      Uri uri = FileProvider.getUriForFile(getContext(), getContext().getPackageName() + ".fileprovider", target);
      Intent intent = new Intent(Intent.ACTION_SEND);
      intent.setType("text/csv");
      intent.putExtra(Intent.EXTRA_STREAM, uri);
      intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
      getActivity().runOnUiThread(() -> {
        try { getActivity().startActivity(Intent.createChooser(intent, "Simpan atau bagikan laporan")); call.resolve(); }
        catch (Exception e) { call.reject("Aplikasi berbagi tidak tersedia", e); }
      });
    } catch (Exception e) { call.reject("Ekspor gagal", e); }
  }
  @PluginMethod public void printReport(PluginCall call) {
    getActivity().runOnUiThread(() -> {
      try {
        PrintManager manager = (PrintManager) getActivity().getSystemService(Context.PRINT_SERVICE);
        if (manager == null) throw new Exception("Layanan cetak tidak tersedia");
        manager.print("Laporan Ruang Guru", getBridge().getWebView().createPrintDocumentAdapter("Laporan Ruang Guru"), null);
        call.resolve();
      } catch (Exception e) { call.reject("Cetak gagal", e); }
    });
  }
}
