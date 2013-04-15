import java.awt.*;
import java.awt.event.*;
import java.io.*;
import javax.swing.*;
import java.awt.Color;
/*
   <OBJECT classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93" 
           width=150 height=100 
 codebase="http://java.sun.com/products/plugin/1.3/jinstall-13-win32.cab#Version=1,3,0,0"> 
     <PARAM NAME="code" value="FileApplet.class">
   </OBJECT>
 */

public class fileabs extends JApplet
{
   private JTextField tfCount;
   final JFileChooser fc = new JFileChooser();

  public void init() {
      setBackground(Color.WHITE);
        JPanel p = new JPanel( new FlowLayout(FlowLayout.CENTER, 15, 15));
        p.add(new JLabel("Select File: "));
        tfCount = new JTextField(50);
        tfCount.setEditable(false);
        p.add(tfCount);
        JButton b2 = new JButton("Browse...");
        p.add(b2);
        b2.addActionListener( new ActionListener(){
            public void actionPerformed(ActionEvent ae) {
               tfCount.setText("dsds");
                int returnVal = fc.showOpenDialog(fileabs.this);
                tfCount.setText(fc.getSelectedFile().getAbsolutePath());
            }
        } );
        
        // p.add(label);
        add(p);
    }
}

